// ══════════════════════════════════════════════
// ClinicalLens — Views & Protocol Data
// ══════════════════════════════════════════════

export const VIEWS = [
  {
    id: 'frontal',
    name: 'Frontal View',
    icon: '👤',
    description: 'Full-face anterior, Frankfurt plane horizontal',
    badge: 'STANDARD',
    steps: [
      'Patient seated upright, back straight, chin level',
      'Frankfurt horizontal plane — tragus to inferior orbital rim level',
      'Hair swept back, ears fully visible',
      'Neutral expression, lips relaxed and together',
      'Camera at eye level, 1.5m patient distance',
    ],
    checklist: [
      { label: 'Lighting', hint: 'Even bilateral, no shadows', target: '2×softbox' },
      { label: 'Distance', hint: '1.5 m from patient', target: '~1.5 m' },
      { label: 'Head position', hint: 'Frankfurt plane level', target: 'Level' },
      { label: 'Background', hint: 'Plain mid-blue/grey backdrop', target: 'Neutral' },
    ],
  },
  {
    id: 'lateral-r',
    name: 'Right Lateral',
    icon: '↪',
    description: 'True 90° profile, right side',
    badge: 'STANDARD',
    steps: [
      'Patient turns head 90° to right — true profile',
      'Lateral canthus, ala, and tragus in single vertical plane',
      'No chin rotation, head held neutral',
      'Contralateral ear must NOT be visible',
      'Camera aligned to mid-tragus height',
    ],
    checklist: [
      { label: 'Head rotation', hint: 'True 90° — no oblique', target: '90°' },
      { label: 'Contralat. ear', hint: 'Must be hidden', target: 'Hidden' },
      { label: 'Lighting', hint: 'Same as frontal setup', target: 'Even' },
      { label: 'Camera height', hint: 'Tragus level', target: 'Mid-tragus' },
    ],
  },
  {
    id: 'lateral-l',
    name: 'Left Lateral',
    icon: '↩',
    description: 'True 90° profile, left side',
    badge: 'STANDARD',
    steps: [
      'Patient turns head 90° to left — true profile',
      'Mirror of right lateral — same alignment rules',
      'Lateral canthus, ala, tragus vertically aligned',
      'Right ear must NOT be visible',
      'Maintain same camera distance and height',
    ],
    checklist: [
      { label: 'Head rotation', hint: 'True 90° left', target: '90°' },
      { label: 'Right ear', hint: 'Must be hidden', target: 'Hidden' },
      { label: 'Lighting', hint: 'Consistent with other views', target: 'Even' },
      { label: 'Camera height', hint: 'Tragus level', target: 'Mid-tragus' },
    ],
  },
  {
    id: 'oblique-r',
    name: 'Right Oblique',
    icon: '↗',
    description: '45° three-quarter view, right side',
    badge: 'STANDARD',
    steps: [
      'Patient turns head 45° to the right from frontal',
      'Both eyes must remain visible in frame',
      'Contralateral nasal ala should be just visible',
      'Frankfurt plane maintained — no chin tilt',
      'Camera at 45° to facial midline, same height',
    ],
    checklist: [
      { label: 'Head rotation', hint: '45° from frontal', target: '45°' },
      { label: 'Both eyes', hint: 'Both must be visible', target: 'Visible' },
      { label: 'Frankfurt plane', hint: 'Level — no chin tilt', target: 'Level' },
      { label: 'Camera angle', hint: '45° to midline', target: '45°' },
    ],
  },
  {
    id: 'oblique-l',
    name: 'Left Oblique',
    icon: '↖',
    description: '45° three-quarter view, left side',
    badge: 'STANDARD',
    steps: [
      'Mirror of right oblique — patient turns 45° left',
      'Both eyes visible, right nasal ala just showing',
      'Frankfurt plane level, no chin elevation',
      'Same distance and lighting as right oblique',
      'Consistent magnification with all other views',
    ],
    checklist: [
      { label: 'Head rotation', hint: '45° from frontal', target: '45°' },
      { label: 'Both eyes', hint: 'Both must be visible', target: 'Visible' },
      { label: 'Frankfurt plane', hint: 'Level — no chin tilt', target: 'Level' },
      { label: 'Camera angle', hint: '45° to midline', target: '45°' },
    ],
  },
];
