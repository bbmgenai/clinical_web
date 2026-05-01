import { useState, useRef, useCallback, useEffect } from 'react';
import { VIEWS } from './views-data';
import { drawOverlay } from './overlays';

export default function ClinicalLens() {
  const [screen, setScreen] = useState('splash');
  const [currentView, setCurrentView] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [completedViews, setCompletedViews] = useState([]);
  const [capturedDataURL, setCapturedDataURL] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const [facingMode, setFacingMode] = useState('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const autoFramingTimeouts = useRef([]);

  // Detect available cameras on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        setAvailableCameras(videoDevices);
        setHasMultipleCameras(videoDevices.length > 1);
      }).catch(() => {});
    }
    // Pre-load voices
    if (synth) synth.getVoices();
  }, [synth]);

  const speakText = useCallback((text) => {
    if (!speechEnabled || !synth) return;
    synth.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    let voice = voices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Zira') || 
      v.name.includes('Google UK English Female') || 
      v.name.includes('Female')
    );
    if (!voice) voice = voices.find(v => v.name.includes('Google US English') || v.lang.includes('en'));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.pitch = 1.1; // Sweeter pitch
    synth.speak(utterance);
  }, [speechEnabled, synth]);

  const clearFramingTimeouts = useCallback(() => {
    autoFramingTimeouts.current.forEach(clearTimeout);
    autoFramingTimeouts.current = [];
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async (preferredFacingOrId) => {
    stopStream();
    
    let videoConstraints = { width: { ideal: 1920 }, height: { ideal: 1080 } };
    
    if (preferredFacingOrId && preferredFacingOrId !== 'user' && preferredFacingOrId !== 'environment') {
      videoConstraints.deviceId = { exact: preferredFacingOrId };
    } else {
      const facing = preferredFacingOrId || facingMode;
      videoConstraints.facingMode = facing;
    }

    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
        audio: false,
      });
      streamRef.current = s;
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      }
      // Re-evaluate available cameras after permission
      if (navigator.mediaDevices?.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices().then(devices => {
          const videoDevices = devices.filter(d => d.kind === 'videoinput');
          setAvailableCameras(videoDevices);
          setHasMultipleCameras(videoDevices.length > 1);
          
          if (s.getVideoTracks().length > 0) {
             const track = s.getVideoTracks()[0];
             const settings = track.getSettings();
             if (settings.deviceId) {
               const idx = videoDevices.findIndex(d => d.deviceId === settings.deviceId);
               if (idx !== -1) setCameraIndex(idx);
             }
          }
        }).catch(() => {});
      }
    } catch {
      // Fallback to any available camera
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.onloadedmetadata = () => videoRef.current.play();
        }
        if (navigator.mediaDevices?.enumerateDevices) {
          navigator.mediaDevices.enumerateDevices().then(devices => {
            const videoDevices = devices.filter(d => d.kind === 'videoinput');
            setAvailableCameras(videoDevices);
            setHasMultipleCameras(videoDevices.length > 1);
            
            if (s.getVideoTracks().length > 0) {
               const track = s.getVideoTracks()[0];
               const settings = track.getSettings();
               if (settings.deviceId) {
                 const idx = videoDevices.findIndex(d => d.deviceId === settings.deviceId);
                 if (idx !== -1) setCameraIndex(idx);
               }
            }
          }).catch(() => {});
        }
      } catch {
        alert('Camera access required. Please allow camera permissions.');
      }
    }
  }, [facingMode, stopStream]);

  // Canvas overlay draw loop
  useEffect(() => {
    if (screen !== 'camera' || !currentView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let running = true;
    function loop() {
      if (!running) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawOverlay(currentView.id, ctx, canvas.width, canvas.height);
      animFrameRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); };
  }, [screen, currentView]);

  function showScreen(id) { setScreen(id); }

  function startView(viewId) {
    const view = VIEWS.find(v => v.id === viewId);
    setCurrentView(view);
    setCurrentStep(0);
    setShowInstructions(true);
    setScreen('camera');
    clearFramingTimeouts();
    setTimeout(() => {
      startCamera();
      speakText(`Live Assistant active. Preparing for ${view.name}.`);
      
      // Prototype Smart Framing Sequence
      autoFramingTimeouts.current.push(setTimeout(() => speakText('Please move a little back.'), 4500));
      autoFramingTimeouts.current.push(setTimeout(() => speakText('Slightly up.'), 8000));
      autoFramingTimeouts.current.push(setTimeout(() => speakText("Stop it, it's perfect. Keep this angle for scan."), 11500));
    }, 400);
  }

  function switchCamera() {
    if (availableCameras.length > 1) {
      const nextIdx = (cameraIndex + 1) % availableCameras.length;
      setCameraIndex(nextIdx);
      const nextDevice = availableCameras[nextIdx];
      if (nextDevice && nextDevice.deviceId) {
        startCamera(nextDevice.deviceId);
        return;
      }
    }
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  }

  function closeCamera() {
    stopStream();
    clearFramingTimeouts();
    if (synth) synth.cancel();
    setScreen('selector');
  }

  function toggleInstructions() {
    setShowInstructions(prev => !prev);
  }

  function nextStep() {
    if (!currentView) return;
    const next = (currentStep + 1) % currentView.steps.length;
    setCurrentStep(next);
    if (!showInstructions) setShowInstructions(true);
    speakText(`Step ${next + 1}. ${currentView.steps[next]}`);
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;
    clearFramingTimeouts();
    if (synth) synth.cancel();
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 80);
    const oc = document.createElement('canvas');
    oc.width = video.videoWidth || 1280;
    oc.height = video.videoHeight || 720;
    oc.getContext('2d').drawImage(video, 0, 0);
    const dataURL = oc.toDataURL('image/jpeg', 0.92);
    setCapturedDataURL(dataURL);
    stopStream();
    setAiResult(null);
    setAiLoading(true);
    setScreen('review');
    runAIAnalysis(dataURL);
  }

  async function runAIAnalysis(dataURL) {
    const base64 = dataURL.split(',')[1];
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          viewName: currentView.name,
          steps: currentView.steps,
          checklist: currentView.checklist,
        }),
      });
      const data = await res.json();
      setAiResult(data.text);
    } catch {
      setAiResult('AI analysis unavailable. Please review manually against the protocol checklist below.');
    } finally {
      setAiLoading(false);
    }
  }

  function retakePhoto() { startView(currentView.id); }

  function acceptAndNext() {
    if (!completedViews.includes(currentView.id)) {
      setCompletedViews(prev => [...prev, currentView.id]);
    }
    setScreen('selector');
  }

  function formatAIResult(text) {
    if (!text) return '';
    return text
      .replace(/ASSESSMENT[:\s]*/gi, '<strong style="color:var(--accent);font-family:\'DM Mono\',monospace;font-size:11px;letter-spacing:1px;">ASSESSMENT</strong><br>')
      .replace(/CORRECT[:\s]*/gi, '<br><strong style="color:var(--accent2);font-family:\'DM Mono\',monospace;font-size:11px;letter-spacing:1px;">CORRECT</strong><br>')
      .replace(/IMPROVE[:\s]*/gi, '<br><strong style="color:var(--warn);font-family:\'DM Mono\',monospace;font-size:11px;letter-spacing:1px;">IMPROVE</strong><br>')
      .replace(/SCORE[:\s]*/gi, '<br><strong style="color:var(--text);font-family:\'DM Mono\',monospace;font-size:11px;letter-spacing:1px;">SCORE</strong><br>')
      .replace(/\n/g, '<br>');
  }

  function getScoreFromResult(text) {
    if (!text) return null;
    const m = text.match(/SCORE[:\s]+([^\n]+)/i);
    if (!m) return null;
    const s = m[1].trim();
    let color = 'green';
    if (s.toLowerCase().includes('retake') || s.toLowerCase().includes('manual')) color = 'red';
    else if (s.toLowerCase().includes('acceptable')) color = 'yellow';
    return { label: s, color };
  }

  const progress = completedViews.length / VIEWS.length * 100;
  const score = getScoreFromResult(aiResult);

  return (
    <>
      <div className="ambient-bg" />
      {/* Flash */}
      <div className={`flash${flashActive ? ' go' : ''}`} />

      {/* ══════ SPLASH ══════ */}
      <div className={`screen${screen === 'splash' ? ' active' : ''}`} id="splash">
        <div className="logo-mark">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="12" r="5" stroke="#00c8ff" strokeWidth="1.5"/>
            <path d="M8 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#00c8ff" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="22" y="2" width="8" height="6" rx="2" fill="rgba(0,200,255,0.15)" stroke="#00c8ff" strokeWidth="1"/>
            <circle cx="26" cy="5" r="1.5" fill="#00c8ff"/>
          </svg>
        </div>
        <div className="app-title">Clinical<span>Lens</span></div>
        <div className="app-subtitle">Surgical Photography Guide</div>
        <div className="dept-tag">Plastic &amp; Reconstructive Surgery</div>
        <button className="start-btn" onClick={() => showScreen('selector')}>Begin Session</button>
      </div>

      {/* ══════ SELECTOR ══════ */}
      <div className={`screen${screen === 'selector' ? ' active' : ''}`} id="selector">
        <div className="top-bar">
          <div className="back-btn" onClick={() => showScreen('splash')}>
            <svg viewBox="0 0 16 16"><path d="M10 13L5 8l5-5"/></svg>
          </div>
          <h2>Select View</h2>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="section-label">Facial Views — Standard Protocol</div>
        <div className="view-grid">
          {VIEWS.map(v => (
            <div className="view-card" key={v.id} onClick={() => startView(v.id)}>
              <div className="view-icon">{v.icon}</div>
              <div className="view-info">
                <div className="view-name">
                  {v.name} {completedViews.includes(v.id) && <span style={{color:'var(--accent2)',fontSize:'12px'}}>✓</span>}
                </div>
                <div className="view-desc">{v.description}</div>
                <span className="badge">{v.badge}</span>
              </div>
              <div className="view-arrow">›</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ CAMERA ══════ */}
      <div className={`screen${screen === 'camera' ? ' active' : ''}`} id="camera-screen">
        <video ref={videoRef} id="video" autoPlay playsInline muted />
        <canvas ref={canvasRef} id="canvas-overlay" />

        <div className="cam-top">
          <div className="cam-view-label">{currentView?.name || 'Camera'}</div>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <div className="cam-switch" style={{fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => {
              setSpeechEnabled(prev => !prev);
              if (speechEnabled && synth) synth.cancel();
            }} title="Toggle Voice Assistant">
              {speechEnabled ? '🔊' : '🔇'}
            </div>
            {hasMultipleCameras && (
              <div className="cam-switch" onClick={switchCamera} title="Switch camera">
                <svg viewBox="0 0 24 24"><path d="M20 5h-3.17L15 3H9L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4"/><path d="M17 8h.01"/></svg>
              </div>
            )}
            <div className="cam-close" onClick={closeCamera}>
              <svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </div>
          </div>
        </div>

        {currentView && (
          <div className="checklist-panel">
            {currentView.checklist.map((c, i) => (
              <div className="check-item ok" key={i}>
                <div className="check-dot" />
                <div className="check-label">{c.label} — {c.hint}</div>
                <div className="check-value">{c.target}</div>
              </div>
            ))}
          </div>
        )}

        {showInstructions && currentView && (
          <div className="instruction-box show">
            <div className="instr-step">STEP {currentStep + 1} OF {currentView.steps.length}</div>
            <div>{currentView.steps[currentStep]}</div>
          </div>
        )}

        <div className="cam-bottom">
          <div className="hint-btn" onClick={toggleInstructions} title="Show instructions">💡</div>
          <div className="shutter" onClick={capturePhoto}>
            <div className="shutter-inner" />
          </div>
          <div className="hint-btn" onClick={nextStep} title="Next step">›</div>
        </div>
      </div>

      {/* ══════ REVIEW ══════ */}
      <div className={`screen${screen === 'review' ? ' active' : ''}`} id="review-screen">
        <div className="review-img-wrap">
          {capturedDataURL && <img src={capturedDataURL} alt="captured photo" />}
          <div className="review-tag">{currentView?.name || ''}</div>
        </div>
        <div className="review-body">
          <div>
            <div className="review-title">Photo Review</div>
            <div className="review-subtitle">AI analysis — {currentView?.name || ''}</div>
          </div>
          <div className="ai-box">
            <div className="ai-box-header">
              <div className="ai-icon">🔬</div>
              <div>
                <div className="ai-label">AI Assessment</div>
                <div className="ai-sublabel">Powered by Claude</div>
              </div>
            </div>
            {aiLoading ? (
              <div className="ai-content loading">
                <span className="ai-spinner" />
                Analysing photograph against clinical photography standards...
              </div>
            ) : (
              <div className="ai-content" dangerouslySetInnerHTML={{ __html: formatAIResult(aiResult) }} />
            )}
            {score && !aiLoading && (
              <div className="score-row">
                <div className="score-pill"><div className={`dot ${score.color}`} />{score.label}</div>
                <div className="score-pill"><div className="dot green" />{currentView?.name}</div>
              </div>
            )}
          </div>
          <div className="action-row">
            <button className="action-btn secondary" onClick={retakePhoto}>↺ Retake</button>
            <button className="action-btn primary" onClick={acceptAndNext}>Accept →</button>
          </div>
          <div className="divider" />
          {currentView && (
            <div className="tips-section">
              <div className="tips-title">PROTOCOL CHECKLIST</div>
              {currentView.checklist.map((c, i) => (
                <div className="tip-item" key={i}>
                  <div className="tip-num">0{i + 1}</div>
                  <div>{c.label}: {c.hint} <span style={{color:'var(--accent)',fontFamily:"'DM Mono',monospace",fontSize:'11px'}}>[{c.target}]</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
