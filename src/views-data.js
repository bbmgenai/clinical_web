// ══════════════════════════════════════════════
// ClinicalLens — Views & Protocol Data
// Grouped into the 6 Standard Target Areas / Ratios
// ══════════════════════════════════════════════

export const VIEWS = [
  {
    id: 'setup-1-10-v',
    name: '1:10 Vertical (24x36cm)',
    icon: '👤',
    description: 'Full Face, Ears (Anterior/Posterior)',
    badge: 'YELLOW',
    color: '#ffde40',
    ratio: '2:3',
    orientation: 'vertical',
    framing: [
      { edge: 'center-v', type: 'dotted' },
      { edge: 'center-h', type: 'dotted' },
      { edge: 'quarter-v-left', type: 'dotted' },
      { edge: 'quarter-v-right', type: 'dotted' }
    ],
    steps: [
      'Target Area: 24x36cm (vertical) at 1:10 ratio.',
      'Framing: Center ears vertically in all views.',
      'Frontal/Oblique: Center entire head horizontally.',
      'Lateral: Place front of face 1/4 frame from edge (DOTTED LINE).'
    ],
    captureAngles: [
      { label: 'Frontal View', instruction: 'Align nose with vertical center.' },
      { label: 'Left Oblique', instruction: 'Rotate 45°. Align distal ear edge.' },
      { label: 'Right Oblique', instruction: 'Rotate 45°. Align distal ear edge.' },
      { label: 'Lateral View', instruction: 'Face front edge 1/4 from frame.' }
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '24x36cm' },
      { label: 'Ratio', hint: 'Reproduction ratio', target: '1:10' },
      { label: 'Prep', hint: 'Hair back, jewelry removed', target: 'Done' }
    ]
  },
  {
    id: 'setup-1-4-h',
    name: '1:4 Horizontal (15x10cm)',
    icon: '🔍',
    description: 'Close-up Face, Mouth, Finger',
    badge: 'GREEN',
    color: '#00a650',
    ratio: '3:2',
    orientation: 'horizontal',
    framing: [
      { edge: 'top', type: 'yellow', label: 'EYEBROWS' },
      { edge: 'left', type: 'yellow', label: 'MCP JOINT' },
      { edge: 'right', type: 'yellow', label: 'MCP JOINT' },
      { edge: 'center-v', type: 'dotted' },
      { edge: 'center-h', type: 'dotted' },
      { edge: 'quarter-v-left', type: 'dotted' },
      { edge: 'quarter-v-right', type: 'dotted' }
    ],
    steps: [
      'Target Area: 15x10cm (horizontal) at 1:4 ratio.',
      'Positioning: Rotate ENTIRE body for oblique/lateral views.',
      '--- CLOSE-UP FACE ---',
      'Preparation: Pull hair back. Remove jewelry/heavy makeup.',
      'Framing: Eyebrows at top. Center nose horizontally.',
      '--- MOUTH ---',
      'Framing: Center vertically. Lateral: lips 1/4 from edge.',
      '--- FINGER ---',
      'Framing: MCP joint at edge. Center finger vertically.'
    ],
    captureAngles: [
      { label: 'Anterior / Frontal', instruction: 'Align center landmarks.' },
      { label: 'Oblique / 45°', instruction: 'Maintain 1:4 ratio carefully.' },
      { label: 'Lateral / Profile', instruction: 'Use 1/4 frame offset markers.' }
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '15x10cm' },
      { label: 'Ratio', hint: 'Reproduction ratio', target: '1:4' },
      { label: 'Framing', hint: 'Follow precise edge alignment', target: 'Aligned' }
    ]
  },
  {
    id: 'setup-1-4-v',
    name: '1:4 Vertical (10x15cm)',
    icon: '👂',
    description: 'Ears (Close-up)',
    badge: 'GREEN',
    color: '#00a650',
    ratio: '2:3',
    orientation: 'vertical',
    framing: [
      { edge: 'center-v', type: 'dotted' },
      { edge: 'center-h', type: 'dotted' }
    ],
    steps: [
      'Target Area: 10x15cm (vertical) at 1:4 ratio.',
      'Preparation: Pull hair completely off of ears.',
      'Positioning: Seat patient on stool at center tape mark. Sit straight.',
      'Framing: Center ear both horizontally and vertically in frame.',
      'Special Notes: Hair must be completely clear of ears in all views.'
    ],
    captureAngles: [
      { label: 'Anterior View', instruction: 'Full face toward camera. Center ear.' },
      { label: 'Lateral Profile', instruction: 'Face 90° to camera. Center ear.' },
      { label: 'Posterior View', instruction: 'Patient faces away. Center ear.' }
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '10x15cm' },
      { label: 'Ratio', hint: 'Reproduction ratio', target: '1:4' },
      { label: 'Hair', hint: 'Hair off ears completely', target: 'Clear' }
    ]
  },
  {
    id: 'setup-1-18-v',
    name: '1:18 Vertical (42x63cm)',
    icon: '🧍‍♀️',
    description: 'TRAM, Hips/Thighs, Calves/Feet',
    badge: 'ORANGE',
    color: '#f5833c',
    ratio: '2:3',
    orientation: 'vertical',
    framing: [
      { edge: 'top', type: 'yellow', label: 'CLAVICLES' },
      { edge: 'bottom', type: 'yellow', label: 'KNEES / TOES' },
      { edge: 'center-v', type: 'dotted' }
    ],
    steps: [
      'Target Area: 42x63cm (vertical) at 1:18 ratio.',
      'Positioning: Stand erect. (Oblique: distal arm back).',
      'Framing (TRAM): Clavicles at TOP of frame.',
      'Framing (Lower): Knees/Toes at BOTTOM of frame.'
    ],
    captureAngles: [
      { label: 'Anterior View', instruction: 'Feet on tape marks. Erect posture.' },
      { label: 'Left Oblique', instruction: 'Rotate patient. Distal arm back.' },
      { label: 'Right Oblique', instruction: 'Rotate patient. Distal arm back.' },
      { label: 'Lateral Profile', instruction: 'Distal leg/breast must be hidden.' },
      { label: 'Posterior View', instruction: 'Stand facing away from camera.' }
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '42x63cm' },
      { label: 'Ratio', hint: 'Reproduction ratio', target: '1:18' },
      { label: 'Lateral', hint: 'Distal parts hidden', target: 'Hidden' }
    ]
  },
  {
    id: 'setup-1-12-h',
    name: '1:12 Horizontal (45x30cm)',
    icon: '👙',
    description: 'Breasts, Abdomen, Forearm',
    badge: 'PINK',
    color: '#d1204e',
    ratio: '3:2',
    orientation: 'horizontal',
    framing: [
      { edge: 'top', type: 'yellow', label: 'CLAVICLES / IMF' },
      { edge: 'left', type: 'yellow', label: 'ELBOW' },
      { edge: 'right', type: 'yellow', label: 'ELBOW' },
      { edge: 'center-v', type: 'dotted' }
    ],
    steps: [
      'Target Area: 45x30cm (horizontal) at 1:12 ratio.',
      '--- BREASTS ---',
      'Preparation: Disrobed above waist. Remove all visible jewelry.',
      'Positioning (Frontal): Stand erect, arms at sides. Feet on tape marks.',
      'Positioning (Oblique): Distal arm should be moved back slightly.',
      'Framing: Clavicles at TOP of frame (YELLOW LINE). Center torso horizontally.',
      'Lateral Framing: Center mass of proximal breast. Distal breast NOT visible.',
      '--- ABDOMEN ---',
      'Preparation: Remove gown completely. Wear photo garment.',
      'Positioning: Stand erect, arms folded above breasts. Feet on tape marks.',
      'Framing: Inframammary fold at TOP of frame (YELLOW LINE). Center torso.',
      '--- FOREARM ---',
      'Preparation: Remove wrist/finger jewelry. Remove nail polish.',
      'Positioning: Seat on stool next to tape mark. Extend hand horizontally.',
      'Framing: Elbow at RIGHT edge of frame (YELLOW LINE). Center forearm vertically.'
    ],
    captureAngles: [
      { label: 'Anterior / Frontal', instruction: 'Align top landmarks to yellow line.' },
      { label: 'Oblique / Lateral', instruction: 'Check distal markers carefully.' }
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '45x30cm' },
      { label: 'Ratio', hint: 'Reproduction ratio', target: '1:12' },
      { label: 'Top Edge', hint: 'Follow precise edge alignment', target: 'Aligned' }
    ]
  },
  {
    id: 'setup-1-10-h',
    name: '1:10 Horizontal (36x24cm)',
    icon: '🖐️',
    description: 'Bilateral Ears, Hand',
    badge: 'YELLOW',
    color: '#ffde40',
    ratio: '3:2',
    orientation: 'horizontal',
    framing: [
      { edge: 'center-v', type: 'dotted' },
      { edge: 'center-h', type: 'dotted' }
    ],
    steps: [
      'Target Area: 36x24cm (horizontal) at 1:10 ratio.',
      '--- HAND ---',
      'Preparation: Remove jewelry from wrist/fingers. Remove nail polish.',
      'Positioning: Seat patient on stool next to tape mark. Extend hand horizontally above tape marks, perpendicular to camera axis.',
      'Framing: Center hand in frame horizontally and vertically.',
      '--- BILATERAL EARS ---',
      'Preparation: Pull hair back. Remove distracting jewelry.',
      'Framing: Center both ears horizontally and vertically in the frame.'
    ],
    captureAngles: [
      { label: 'Anterior / Palm-Up', instruction: 'Center hand. Remove jewelry & nail polish.' },
      { label: 'Posterior / Palm-Down', instruction: 'Center hand. Verify nail polish removed.' },
      { label: 'Lateral View', instruction: 'Center thumb side. Check extension.' }
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '36x24cm' },
      { label: 'Ratio', hint: 'Reproduction ratio', target: '1:10' },
      { label: 'Prep', hint: 'Jewelry & nail polish removed', target: 'Removed' }
    ]
  }
];
