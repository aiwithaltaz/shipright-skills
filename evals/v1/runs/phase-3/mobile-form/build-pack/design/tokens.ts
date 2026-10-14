// Design tokens. Status: Proposed (delegated, D3), 2026-10-13.
// The owner checks these on the /design preview (ticket T1). Change values here only.
// Components import semantic names from this file. Never hardcode colors or sizes in screens.

export const color = {
  bg: '#FFFFFF',
  sunken: '#F3F4F6',
  text: '#121417',
  muted: '#5A616B',
  border: '#E3E6EA',
  fieldBorder: '#868D97',
  accent: '#0B6E8A',
  accentPressed: '#095A71',
  accentTint: '#E8F3F6',
  onAccent: '#FFFFFF',
  danger: '#C1341F',
  dangerTint: '#FCEBE7',
  success: '#1B7A4B',
  successTint: '#E7F5EE',
} as const;

// System font (SF Pro on iOS, Roboto on Android): leave fontFamily unset.
export const type = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  section: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 17, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  secondary: { fontSize: 15, lineHeight: 20, fontWeight: '400' },
  label: { fontSize: 15, lineHeight: 20, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
} as const;

export const space = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64,
} as const;

export const radius = { badge: 6, control: 10, sheet: 12 } as const;

export const size = {
  target: 48,
  field: 52,
  button: 52,
  chipMinWidth: 56,
  topBar: 48,
  sidePadding: 20,
  icon: 20,
  iconSmall: 16,
  iconStroke: 2,
  focusRing: 2,
  focusOffset: 2,
  textareaMin: 104,
} as const;

export const motion = {
  press: 120,
  popover: 180,
  sheet: 240,
  // Reduced motion: replace slides with a fade of the same duration.
} as const;
