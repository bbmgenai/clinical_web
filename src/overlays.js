import { VIEWS } from './views-data';

// ══════════════════════════════════════════════
// ClinicalLens — Canvas Overlay Drawings
// Precision Viewfinders Based on PSS Standard
// ══════════════════════════════════════════════

export function drawOverlay(viewId, ctx, w, h, aspectMode = '3:2', isAligned = false) {
  const view = VIEWS.find(v => v.id === viewId);
  if (!view) return;
  
  const color = view.color;
  const framing = view.framing || [];
  
  // Calculate Target Box based on Aspect Ratio mode
  let boxW, boxH;
  
  if (aspectMode === '4:3') {
    // 4:3 Wide Mode (Always Horizontal)
    boxW = w * 0.85;
    boxH = boxW * (3/4);
    if (boxH > h * 0.85) {
      boxH = h * 0.85;
      boxW = boxH * (4/3);
    }
  } else {
    // 3:2 Standard Mode (Strict to view's original orientation)
    if (view.orientation === 'vertical') {
      boxH = h * 0.75;
      boxW = boxH * (2/3);
      if (boxW > w * 0.8) {
        boxW = w * 0.8;
        boxH = boxW * (3/2);
      }
    } else {
      boxW = w * 0.85;
      boxH = boxW * (2/3);
      if (boxH > h * 0.75) {
        boxH = h * 0.75;
        boxW = boxH * (3/2);
      }
    }
  }

  const x = (w - boxW) / 2;
  const y = (h - boxH) / 2;

  // 1. Draw Base Bounding Box
  if (isAligned) {
    ctx.strokeStyle = '#ffde40';
    ctx.lineWidth = 6;
    ctx.shadowColor = 'rgba(255, 222, 64, 0.5)';
    ctx.shadowBlur = 20;
  } else {
    ctx.strokeStyle = hexToRgba(color, 0.3);
    ctx.lineWidth = 2;
  }
  ctx.setLineDash([]);
  ctx.strokeRect(x, y, boxW, boxH);
  ctx.shadowBlur = 0; // Reset for inner fill

  // 2. Draw Subtle Inner Fill
  ctx.fillStyle = hexToRgba(color, 0.05);
  ctx.fillRect(x, y, boxW, boxH);

  // 3. Draw Specific Framing Overlays from Protocol
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;

  framing.forEach(f => {
    if (f.type === 'dotted') {
      // Center-oriented framing
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      if (f.edge === 'center-v') {
        ctx.moveTo(x + boxW/2, y);
        ctx.lineTo(x + boxW/2, y + boxH);
      } else if (f.edge === 'center-h') {
        ctx.moveTo(x, y + boxH/2);
        ctx.lineTo(x + boxW, y + boxH/2);
      } else if (f.edge === 'quarter-v-left') {
        ctx.moveTo(x + boxW/4, y);
        ctx.lineTo(x + boxW/4, y + boxH);
      } else if (f.edge === 'quarter-v-right') {
        ctx.moveTo(x + boxW * 0.75, y);
        ctx.lineTo(x + boxW * 0.75, y + boxH);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (f.type === 'yellow') {
      // Reference Edge (Always Yellow per protocol)
      ctx.strokeStyle = '#ffde40';
      ctx.lineWidth = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      
      ctx.fillStyle = '#ffde40';
      ctx.font = 'bold 12px "DM Mono", monospace';
      
      if (f.edge === 'top') {
        ctx.moveTo(x, y); ctx.lineTo(x + boxW, y);
        ctx.textAlign = 'center';
        ctx.fillText(`ALIGN: ${f.label}`, x + boxW/2, y - 12);
      } else if (f.edge === 'bottom') {
        ctx.moveTo(x, y + boxH); ctx.lineTo(x + boxW, y + boxH);
        ctx.textAlign = 'center';
        ctx.fillText(`ALIGN: ${f.label}`, x + boxW/2, y + boxH + 22);
      } else if (f.edge === 'left') {
        ctx.moveTo(x, y); ctx.lineTo(x, y + boxH);
        ctx.textAlign = 'right';
        ctx.fillText(`ALIGN: ${f.label}`, x - 12, y + boxH/2);
      } else if (f.edge === 'right') {
        ctx.moveTo(x + boxW, y); ctx.lineTo(x + boxW, y + boxH);
        ctx.textAlign = 'left';
        ctx.fillText(`ALIGN: ${f.label}`, x + boxW + 12, y + boxH/2);
      }
      ctx.stroke();
    }
  });

  // Reset Shadow
  ctx.shadowBlur = 0;

  // Draw Header
  ctx.fillStyle = color;
  ctx.font = 'bold 13px "DM Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TARGET: ' + view.name.toUpperCase(), w/2, y - 45);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
