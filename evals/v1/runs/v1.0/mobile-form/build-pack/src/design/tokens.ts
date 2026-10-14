// Design tokens. Source: DESIGN.md. Status: Proposed (delegated, D3) until the owner approves the /design preview.
// Components use the semantic names below, never raw values.

export const color = {
  bg: '#FFFFFF',
  sunken: '#F3F4F6',
  text: '#121417', // 16.3:1 on bg
  muted: '#5A616B', // 6.3:1 on bg, 5.7:1 on sunken
  border: '#E3E6EA', // dividers only, not field borders
  fieldBorder: '#868D97', // 3.4:1 on bg
  accent: '#0B6A88', // 6.1:1 with white text
  accentPressed: '#08546C',
  accentTint: '#E8F3F7', // selected option fill; accent text on it 5.4:1
  onAccent: '#FFFFFF',
  disabledBg: '#E3E6EA',
  disabledText: '#5A616B', // 5.0:1 on disabledBg
  danger: '#C1341F', // 4.8:1 on bg
  dangerTint: '#FCEBE7',
  success: '#1B7A4B',
  successTint: '#E7F5EE', // success text on it 4.8:1
} as const;

export const font = {
  // Native: undefined uses San Francisco on iOS and Roboto on Android.
  family: undefined as string | undefined,
  size: { caption: 13, secondary: 15, body: 17, section: 20, title: 28 },
  weight: { regular: '400', semibold: '600', bold: '700' } as const,
  lineHeight: { caption: 18, secondary: 20, body: 24, section: 26, title: 34 },
} as const;

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 } as const;

export const radius = { tag: 4, control: 10, sheet: 12 } as const;

export const size = {
  touch: 48, // minimum target
  field: 52,
  button: 52,
  dayChip: 64, // height; width shares the row
  slotRow: 56,
  iconSm: 16,
  icon: 20,
  pagePadding: 20,
} as const;

export const elevation = {
  // Borders separate things at rest. Shadow only on what floats (sheets, menus).
  sheet: { shadowColor: '#101828', shadowOpacity: 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
} as const;

export const motion = {
  press: 120,
  select: 180,
  screen: 240,
  easeOut: [0.23, 1, 0.32, 1] as const,
  // Reduced motion: opacity only, no slide. Check AccessibilityInfo.isReduceMotionEnabled().
} as const;

export const focus = { width: 2, offset: 2, color: color.accent } as const;
