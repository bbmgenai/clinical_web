// ══════════════════════════════════════════════
// ClinicalLens — Canvas Overlay Drawings
// Precision Viewfinders Based on PSS Standard
// ══════════════════════════════════════════════

// Photographic Standards Chart Colors:
// 1:4 (15x10cm) -> Green (#00a650)
// 1:10 (24x36cm) -> Yellow (#ffde40)
// 1:12 (45x30cm) -> Pink/Red (#d1204e)
// 1:18 (42x63cm) -> Orange (#f5833c)

const VIEW_COLORS = {
  'close-up-face': '#00a650', // 1:4
  'mouth': '#00a650',
  'finger': '#00a650',
  
  'full-face': '#ffde40', // 1:10
  'ears': '#ffde40', // usually 1:10 or 1:4 (assuming 1:10 for general)
  'hand': '#ffde40',
  
  'breasts': '#d1204e', // 1:12
  'abdomen': '#d1204e',
  'forearm': '#d1204e',
  
  'tram': '#f5833c', // 1:18
  'hips-thighs': '#f5833c',
  'calves-feet': '#f5833c'
};

const VIEW_RATIOS = {
  'close-up-face': '1:4',
  'mouth': '1:4',
  'finger': '1:4',
  'full-face': '1:10',
  'ears': '1:10',
  'hand': '1:10',
  'breasts': '1:12',
  'abdomen': '1:12',
  'forearm': '1:12',
  'tram': '1:18',
  'hips-thighs': '1:18',
  'calves-feet': '1:18'
};

export function drawOverlay(viewId, ctx, w, h) {
  const color = VIEW_COLORS[viewId] || '#00c8ff';
  const ratioText = VIEW_RATIOS[viewId] || 'Custom';
  
  switch (viewId) {
    case 'full-face':
    case 'ears':
    case 'tram':
    case 'hips-thighs':
    case 'calves-feet':
      return drawVerticalTarget(ctx, w, h, viewId, color, ratioText);
    case 'close-up-face':
    case 'mouth':
    case 'breasts':
    case 'abdomen':
    case 'forearm':
    case 'hand':
    case 'finger':
      return drawHorizontalTarget(ctx, w, h, viewId, color, ratioText);
    default:
      return drawHorizontalTarget(ctx, w, h, viewId, color, ratioText);
  }
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawGrid(ctx, w, h, color) {
  // Rule of thirds grid
  ctx.strokeStyle = hexToRgba(color, 0.25);
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(w/3, 0); ctx.lineTo(w/3, h);
  ctx.moveTo(2*w/3, 0); ctx.lineTo(2*w/3, h);
  ctx.moveTo(0, h/3); ctx.lineTo(w, h/3);
  ctx.moveTo(0, 2*h/3); ctx.lineTo(w, 2*h/3);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Center precision crosshair
  ctx.strokeStyle = hexToRgba(color, 0.9);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w/2 - 15, h/2); ctx.lineTo(w/2 + 15, h/2);
  ctx.moveTo(w/2, h/2 - 15); ctx.lineTo(w/2, h/2 + 15);
  ctx.stroke();
}

function drawBrackets(ctx, x, y, bw, bh, color) {
  const len = Math.min(40, bw * 0.1);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  
  // Top-left
  ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
  // Top-right
  ctx.moveTo(x + bw - len, y); ctx.lineTo(x + bw, y); ctx.lineTo(x + bw, y + len);
  // Bottom-left
  ctx.moveTo(x, y + bh - len); ctx.lineTo(x, y + bh); ctx.lineTo(x + len, y + bh);
  // Bottom-right
  ctx.moveTo(x + bw - len, y + bh); ctx.lineTo(x + bw, y + bh); ctx.lineTo(x + bw, y + bh - len);
  
  ctx.stroke();

  // Subtle inner fill
  ctx.fillStyle = hexToRgba(color, 0.08);
  ctx.fillRect(x, y, bw, bh);
  
  // Edge marker
  ctx.strokeStyle = hexToRgba(color, 0.6);
  ctx.lineWidth = 2;
  // Visual indicators that this is the bounding edge for the target
  ctx.beginPath();
  ctx.moveTo(x + bw/2 - 10, y); ctx.lineTo(x + bw/2 + 10, y);
  ctx.moveTo(x + bw/2 - 10, y + bh); ctx.lineTo(x + bw/2 + 10, y + bh);
  ctx.moveTo(x, y + bh/2 - 10); ctx.lineTo(x, y + bh/2 + 10);
  ctx.moveTo(x + bw, y + bh/2 - 10); ctx.lineTo(x + bw, y + bh/2 + 10);
  ctx.stroke();
}

function drawVerticalTarget(ctx, w, h, id, color, ratio) {
  drawGrid(ctx, w, h, color);
  
  // Vertical Target: 2:3 Ratio
  let boxH = h * 0.8;
  let boxW = boxH * (2/3);
  if (boxW > w * 0.8) {
    boxW = w * 0.8;
    boxH = boxW * (3/2);
  }
  
  const x = (w - boxW) / 2;
  const y = (h - boxH) / 2;
  
  drawBrackets(ctx, x, y, boxW, boxH, color);
  
  ctx.fillStyle = color;
  ctx.font = 'bold 13px "DM Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TARGET: ' + id.replace(/-/g, ' ').toUpperCase() + ' [RATIO ' + ratio + ']', w/2, y - 15);
}

function drawHorizontalTarget(ctx, w, h, id, color, ratio) {
  drawGrid(ctx, w, h, color);
  
  // Horizontal Target: 3:2 Ratio
  let boxW = w * 0.8;
  let boxH = boxW * (2/3);
  if (boxH > h * 0.8) {
    boxH = h * 0.8;
    boxW = boxH * (3/2);
  }
  
  const x = (w - boxW) / 2;
  const y = (h - boxH) / 2;
  
  drawBrackets(ctx, x, y, boxW, boxH, color);
  
  ctx.fillStyle = color;
  ctx.font = 'bold 13px "DM Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TARGET: ' + id.replace(/-/g, ' ').toUpperCase() + ' [RATIO ' + ratio + ']', w/2, y - 15);
}
