// ══════════════════════════════════════════════
// ClinicalLens — Canvas Overlay Drawings
// ══════════════════════════════════════════════

export function drawOverlay(viewId, ctx, w, h) {
  switch (viewId) {
    case 'frontal': return drawFrontal(ctx, w, h);
    case 'lateral-r': return drawLateralR(ctx, w, h);
    case 'lateral-l': return drawLateralL(ctx, w, h);
    case 'oblique-r': return drawObliqueR(ctx, w, h);
    case 'oblique-l': return drawObliqueL(ctx, w, h);
  }
}

function drawFrontal(ctx, w, h) {
  ctx.beginPath();
  ctx.ellipse(w/2, h*0.28, w*0.18, h*0.24, 0, 0, Math.PI*2);
  ctx.strokeStyle='rgba(0,200,255,0.55)'; ctx.lineWidth=2; ctx.setLineDash([8,4]); ctx.stroke();
  ctx.fillStyle='rgba(0,200,255,0.05)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(w*0.2,h*0.6); ctx.bezierCurveTo(w*0.32,h*0.55,w*0.68,h*0.55,w*0.8,h*0.6);
  ctx.strokeStyle='rgba(0,200,255,0.4)'; ctx.lineWidth=1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w/2,h*0.04); ctx.lineTo(w/2,h*0.7);
  ctx.strokeStyle='rgba(0,200,255,0.3)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.28,h*0.245); ctx.lineTo(w*0.72,h*0.245);
  ctx.strokeStyle='rgba(255,184,0,0.5)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle='rgba(0,200,255,0.8)'; ctx.font='10px DM Mono,monospace';
  ctx.fillText('FRANKFURT PLANE',w*0.29,h*0.235);
  ctx.fillText('ALIGN FACE',w/2+6,h*0.05);
}

function drawLateralR(ctx, w, h) {
  ctx.beginPath();
  ctx.moveTo(w*0.58,h*0.06);
  ctx.bezierCurveTo(w*0.7,h*0.06,w*0.72,h*0.12,w*0.7,h*0.18);
  ctx.bezierCurveTo(w*0.68,h*0.22,w*0.65,h*0.22,w*0.64,h*0.26);
  ctx.bezierCurveTo(w*0.63,h*0.3,w*0.61,h*0.32,w*0.6,h*0.38);
  ctx.bezierCurveTo(w*0.58,h*0.5,w*0.48,h*0.56,w*0.44,h*0.58);
  ctx.bezierCurveTo(w*0.36,h*0.6,w*0.34,h*0.55,w*0.38,h*0.52);
  ctx.bezierCurveTo(w*0.4,h*0.5,w*0.43,h*0.46,w*0.44,h*0.42);
  ctx.bezierCurveTo(w*0.46,h*0.38,w*0.44,h*0.34,w*0.44,h*0.28);
  ctx.bezierCurveTo(w*0.44,h*0.22,w*0.46,h*0.16,w*0.5,h*0.1);
  ctx.bezierCurveTo(w*0.52,h*0.07,w*0.56,h*0.06,w*0.58,h*0.06);
  ctx.closePath();
  ctx.strokeStyle='rgba(0,200,255,0.5)'; ctx.lineWidth=2; ctx.setLineDash([8,4]); ctx.stroke();
  ctx.fillStyle='rgba(0,200,255,0.05)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(w*0.5,h*0.04); ctx.lineTo(w*0.5,h*0.7);
  ctx.strokeStyle='rgba(255,184,0,0.4)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle='rgba(0,200,255,0.8)'; ctx.font='10px DM Mono,monospace';
  ctx.fillText('TRUE 90° PROFILE',w*0.28,h*0.72);
}

function drawLateralL(ctx, w, h) {
  ctx.beginPath();
  ctx.moveTo(w*0.42,h*0.06);
  ctx.bezierCurveTo(w*0.3,h*0.06,w*0.28,h*0.12,w*0.3,h*0.18);
  ctx.bezierCurveTo(w*0.32,h*0.22,w*0.35,h*0.22,w*0.36,h*0.26);
  ctx.bezierCurveTo(w*0.37,h*0.3,w*0.39,h*0.32,w*0.4,h*0.38);
  ctx.bezierCurveTo(w*0.42,h*0.5,w*0.52,h*0.56,w*0.56,h*0.58);
  ctx.bezierCurveTo(w*0.64,h*0.6,w*0.66,h*0.55,w*0.62,h*0.52);
  ctx.bezierCurveTo(w*0.6,h*0.5,w*0.57,h*0.46,w*0.56,h*0.42);
  ctx.bezierCurveTo(w*0.54,h*0.38,w*0.56,h*0.34,w*0.56,h*0.28);
  ctx.bezierCurveTo(w*0.56,h*0.22,w*0.54,h*0.16,w*0.5,h*0.1);
  ctx.bezierCurveTo(w*0.48,h*0.07,w*0.44,h*0.06,w*0.42,h*0.06);
  ctx.closePath();
  ctx.strokeStyle='rgba(0,200,255,0.5)'; ctx.lineWidth=2; ctx.setLineDash([8,4]); ctx.stroke();
  ctx.fillStyle='rgba(0,200,255,0.05)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(w*0.5,h*0.04); ctx.lineTo(w*0.5,h*0.7);
  ctx.strokeStyle='rgba(255,184,0,0.4)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle='rgba(0,200,255,0.8)'; ctx.font='10px DM Mono,monospace';
  ctx.fillText('TRUE 90° PROFILE',w*0.28,h*0.72);
}

function drawObliqueR(ctx, w, h) {
  ctx.beginPath();
  ctx.ellipse(w*0.52,h*0.26, w*0.2,h*0.22, Math.PI/8, 0, Math.PI*2);
  ctx.strokeStyle='rgba(0,200,255,0.5)'; ctx.lineWidth=2; ctx.setLineDash([8,4]); ctx.stroke();
  ctx.fillStyle='rgba(0,200,255,0.05)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(w*0.38,h*0.26); ctx.lineTo(w*0.68,h*0.26);
  ctx.strokeStyle='rgba(255,184,0,0.45)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle='rgba(0,200,255,0.8)'; ctx.font='10px DM Mono,monospace';
  ctx.fillText('45° OBLIQUE',w*0.36,h*0.72);
  ctx.fillText('BOTH EYES VISIBLE',w*0.3,h*0.76);
}

function drawObliqueL(ctx, w, h) {
  ctx.beginPath();
  ctx.ellipse(w*0.48,h*0.26, w*0.2,h*0.22, -Math.PI/8, 0, Math.PI*2);
  ctx.strokeStyle='rgba(0,200,255,0.5)'; ctx.lineWidth=2; ctx.setLineDash([8,4]); ctx.stroke();
  ctx.fillStyle='rgba(0,200,255,0.05)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(w*0.32,h*0.26); ctx.lineTo(w*0.62,h*0.26);
  ctx.strokeStyle='rgba(255,184,0,0.45)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle='rgba(0,200,255,0.8)'; ctx.font='10px DM Mono,monospace';
  ctx.fillText('45° OBLIQUE',w*0.36,h*0.72);
  ctx.fillText('BOTH EYES VISIBLE',w*0.3,h*0.76);
}
