// ══════════════════════════════════════════════
// ClinicalLens — Views & Protocol Data
// Verified completely and strictly against the PSS Photography Book Standards (Pages 4-8)
// ══════════════════════════════════════════════

export const VIEWS = [
  {
    id: 'full-face',
    name: 'Full Face',
    icon: '👤',
    description: 'Target: 24x36cm (vertical) | Ratio: 1:10',
    badge: 'FACE',
    steps: [
      'Patient Preparation: Pull hair off face and behind ears using a black headband or small clips. Remove jewelry, eyeglasses, and heavy makeup. Cover shirt collar with a black drape.',
      'Patient Positioning: Seat patient on a stool adjusted to a comfortable height at the center of a tape mark pattern. Patient should sit up straight with feet on either side of the tape mark.',
      'When turning for oblique and lateral views, ensure the patient rotates their entire body, including shoulders and feet.',
      'Camera Angle & Framing: You should center ears vertically in all views.',
      'For frontal and oblique views, center the entire head horizontally.',
      'For lateral views, point your camera to place the front of face 1/4 frame from the edge.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '24x36cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:10' },
      { label: 'Framing (Frontal/Oblique)', hint: 'Head centered horizontally', target: 'Centered' },
      { label: 'Framing (Vertical)', hint: 'Ears centered vertically', target: 'Ears Centered' }
    ]
  },
  {
    id: 'close-up-face',
    name: 'Close-up Face',
    icon: '🔍',
    description: 'Target: 15x10cm (horizontal) | Ratio: 1:4',
    badge: 'FACE',
    steps: [
      'Patient Preparation: Pull hair off face and behind ears, remove jewelry and eyeglasses, remove heavy makeup, and cover shirt collar with a black drape.',
      'Patient Positioning: Seat patient on a stool, sitting up straight. For oblique and lateral views, the patient should rotate their entire body.',
      'Camera Angle & Framing: You should place eyebrows (or proximal eyebrow) at the top of the frame.',
      'You should center the nose horizontally in all views.',
      'Special Note: For a basal view, point your camera so the tip of the nose is aligned with the upper eyelid crease.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '15x10cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:4' },
      { label: 'Top Edge', hint: 'Framing reference', target: 'Eyebrows' },
      { label: 'Centering', hint: 'Nose horizontally', target: 'Centered' }
    ]
  },
  {
    id: 'ears',
    name: 'Ears',
    icon: '👂',
    description: 'Target: 24x36cm or 10x15cm (vertical)',
    badge: 'FACE',
    steps: [
      'Patient Preparation: Pull hair completely off the face and behind ears. Remove jewelry and eyeglasses.',
      'Patient Positioning: Seat the patient on a stool, sitting up straight. Rotate their entire body for oblique and lateral views.',
      'Camera Angle & Framing: For anterior and posterior views, center the ears vertically and center the entire head horizontally.',
      'For a close-up, you should center the ear exactly in the frame.',
      'Make sure hair is completely off of the ears in all views.'
    ],
    checklist: [
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:10 or 1:4' },
      { label: 'Hair', hint: 'Hair off ears completely', target: 'Clear' },
      { label: 'Framing (Close-up)', hint: 'Ear position', target: 'Centered' }
    ]
  },
  {
    id: 'mouth',
    name: 'Mouth',
    icon: '👄',
    description: 'Target: 15x10cm (horizontal) | Ratio: 1:4',
    badge: 'FACE',
    steps: [
      'Patient Preparation: Pull hair off face, remove lipstick and other makeup, remove any distracting jewelry, and cover shirt collar with a black drape.',
      'Patient Positioning: Seat the patient on a stool, sitting up straight.',
      'Camera Angle & Framing: You should center the mouth vertically in all views.',
      'In anterior views, you should center the mouth horizontally.',
      'In oblique and lateral views, you should position the lips 1/4 frame from the edge.',
      'For intraoral photographs, use flash heads positioned close to the end of the lens.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '15x10cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:4' },
      { label: 'Vertical Framing', hint: 'Mouth position', target: 'Centered' },
      { label: 'Lips (Lateral)', hint: '1/4 frame from edge', target: '1/4 Frame' }
    ]
  },
  {
    id: 'tram',
    name: 'TRAM',
    icon: '🧍‍♀️',
    description: 'Target: 42x63cm (vertical) | Ratio: 1:18',
    badge: 'BODY',
    steps: [
      'Patient Preparation: Remove any visible jewelry. Remove gown completely. Patient should wear a photo garment.',
      'Patient Positioning: Have the patient stand comfortably erect with arms at their sides and feet aligned with tape marks.',
      'For oblique views, ask the patient to move their distal arm back slightly.',
      'Camera Angle & Framing: You should position the clavicles exactly at the top of the frame.',
      'For frontal and oblique views, center the torso horizontally.',
      'For lateral views, center the mass of the proximal breast horizontally. Ensure the distal breast is not visible.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '42x63cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:18' },
      { label: 'Top Edge', hint: 'Framing reference', target: 'Clavicles' },
      { label: 'Lateral View', hint: 'Distal breast hidden', target: 'Hidden' }
    ]
  },
  {
    id: 'breasts',
    name: 'Breasts',
    icon: '👙',
    description: 'Target: 45x30cm (horizontal) | Ratio: 1:12',
    badge: 'BODY',
    steps: [
      'Patient Preparation: Patient should be disrobed above the waist. Remove any visible jewelry.',
      'Patient Positioning: Have the patient stand comfortably erect with arms at their sides.',
      'Camera Angle & Framing: You should position the clavicles exactly at the top of the frame.',
      'For frontal and oblique views, center the torso horizontally.',
      'For lateral views, center the mass of the proximal breast horizontally. Ensure the distal breast is not visible.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '45x30cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:12' },
      { label: 'Top Edge', hint: 'Framing reference', target: 'Clavicles' },
      { label: 'Lateral View', hint: 'Distal breast hidden', target: 'Hidden' }
    ]
  },
  {
    id: 'abdomen',
    name: 'Abdomen',
    icon: '🤰',
    description: 'Target: 45x30cm (horizontal) | Ratio: 1:12',
    badge: 'BODY',
    steps: [
      'Patient Preparation: Remove gown completely. Patient should wear a photo garment.',
      'Patient Positioning: Have the patient stand comfortably erect with arms folded above their breasts. Feet should be aligned with tape marks.',
      'Camera Angle & Framing: You should position the inframammary fold exactly at the top of the frame.',
      'Point your camera to center the torso horizontally.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '45x30cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:12' },
      { label: 'Top Edge', hint: 'Framing reference', target: 'Inframammary fold' },
      { label: 'Arms', hint: 'Arm position', target: 'Folded above breasts' }
    ]
  },
  {
    id: 'hips-thighs',
    name: 'Hips / Thighs',
    icon: '🦵',
    description: 'Target: 42x63cm (vertical) | Ratio: 1:18',
    badge: 'LOWER BODY',
    steps: [
      'Patient Preparation: Remove gown completely. Patient should wear a photo garment.',
      'Patient Positioning: Have the patient stand comfortably erect with arms folded above their breasts.',
      'Feet should be at approximately shoulder width, aligned with tape marks.',
      'Camera Angle & Framing: You should position the knees exactly at the bottom of the frame.',
      'Center the hips horizontally. For lateral views, ensure the distal leg is not visible.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '42x63cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:18' },
      { label: 'Bottom Edge', hint: 'Framing reference', target: 'Knees' },
      { label: 'Lateral View', hint: 'Distal leg hidden', target: 'Hidden' }
    ]
  },
  {
    id: 'calves-feet',
    name: 'Calves / Feet',
    icon: '🦶',
    description: 'Target: 42x63cm (vertical) | Ratio: 1:18',
    badge: 'LOWER BODY',
    steps: [
      'Patient Preparation: Patient disrobed below the waist. Remove any jewelry from ankles or toes, and remove nail polish.',
      'Patient Positioning: Patient should stand on a step stage with feet at approximately shoulder width.',
      'Camera Angle & Framing: You should position the toes exactly at the bottom of the frame.',
      'Point your camera to center the feet horizontally. For lateral views, ensure the distal leg is not visible.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Vertical framing', target: '42x63cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:18' },
      { label: 'Bottom Edge', hint: 'Framing reference', target: 'Toes' },
      { label: 'Prep', hint: 'Ankle/toe jewelry, polish', target: 'Removed' }
    ]
  },
  {
    id: 'forearm',
    name: 'Forearm',
    icon: '💪',
    description: 'Target: 45x30cm (horizontal) | Ratio: 1:12',
    badge: 'EXTREMITIES',
    steps: [
      'Patient Preparation: Remove any jewelry from the wrist or fingers. Remove nail polish.',
      'Patient Positioning: Seat the patient on a stool adjusted to a comfortable height next to a tape mark pattern.',
      'Patient should extend their hand horizontally above tape marks that are perpendicular to the camera axis.',
      'Camera Angle & Framing: You should place the elbow exactly at the edge of the frame.',
      'Point your camera to center the forearm vertically.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '45x30cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:12' },
      { label: 'Edge reference', hint: 'Framing edge', target: 'Elbow' },
      { label: 'Centering', hint: 'Forearm vertically', target: 'Centered' }
    ]
  },
  {
    id: 'hand',
    name: 'Hand',
    icon: '🖐️',
    description: 'Target: 36x24cm (horizontal) | Ratio: 1:10',
    badge: 'EXTREMITIES',
    steps: [
      'Patient Preparation: Remove any jewelry from the wrist or fingers. Remove nail polish.',
      'Patient Positioning: Seat the patient on a stool next to a tape mark pattern.',
      'Patient should extend their hand horizontally above tape marks that are perpendicular to the camera axis.',
      'Camera Angle & Framing: You should center the hand exactly in the frame.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '36x24cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:10' },
      { label: 'Centering', hint: 'Hand position', target: 'Centered' },
      { label: 'Prep', hint: 'Jewelry & nail polish', target: 'Removed' }
    ]
  },
  {
    id: 'finger',
    name: 'Finger',
    icon: '☝️',
    description: 'Target: 15x10cm (horizontal) | Ratio: 1:4',
    badge: 'EXTREMITIES',
    steps: [
      'Patient Preparation: Remove any jewelry from the wrist or fingers. Remove nail polish.',
      'Patient Positioning: Seat the patient on a stool and have them extend their hand horizontally.',
      'Camera Angle & Framing: You should place the metacarpophalangeal joint exactly at the edge of the frame.',
      'Point your camera to center the finger vertically.'
    ],
    checklist: [
      { label: 'Target Area', hint: 'Horizontal framing', target: '15x10cm' },
      { label: 'Reproduction Ratio', hint: 'Scale', target: '1:4' },
      { label: 'Edge reference', hint: 'Framing edge', target: 'MCP joint' },
      { label: 'Centering', hint: 'Finger vertically', target: 'Centered' }
    ]
  }
];
