// 从种子色生成 M3 完整的 light/dark 色板，同时输出 Beer CSS 使用的变量名。
// 运行：pnpm theme
// 输出：src/styles/theme.css（不要手改这个文件，改种子色后重新生成）
import { writeFileSync } from 'node:fs'
import {
  themeFromSourceColor,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities'

const SEED = process.argv[2] ?? '#3B5BA5'

const theme = themeFromSourceColor(argbFromHex(SEED))

const kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

const BASE_ROLES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'outline',
  'outlineVariant',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
  'shadow',
  'scrim',
]

// M3 2023 扩展 surface 角色：由 neutral 调色板的固定 tone 推导
const SURFACE_TONES = {
  light: {
    surfaceDim: 87,
    surfaceBright: 98,
    surfaceContainerLowest: 100,
    surfaceContainerLow: 96,
    surfaceContainer: 94,
    surfaceContainerHigh: 92,
    surfaceContainerHighest: 90,
  },
  dark: {
    surfaceDim: 6,
    surfaceBright: 24,
    surfaceContainerLowest: 4,
    surfaceContainerLow: 10,
    surfaceContainer: 12,
    surfaceContainerHigh: 17,
    surfaceContainerHighest: 22,
  },
}

const BEER_NAMES = {
  primary: '--primary',
  onPrimary: '--on-primary',
  primaryContainer: '--primary-container',
  onPrimaryContainer: '--on-primary-container',
  secondary: '--secondary',
  onSecondary: '--on-secondary',
  secondaryContainer: '--secondary-container',
  onSecondaryContainer: '--on-secondary-container',
  tertiary: '--tertiary',
  onTertiary: '--on-tertiary',
  tertiaryContainer: '--tertiary-container',
  onTertiaryContainer: '--on-tertiary-container',
  error: '--error',
  onError: '--on-error',
  errorContainer: '--error-container',
  onErrorContainer: '--on-error-container',
  surface: '--surface',
  onSurface: '--on-surface',
  surfaceVariant: '--surface-variant',
  onSurfaceVariant: '--on-surface-variant',
  outline: '--outline',
  outlineVariant: '--outline-variant',
  inverseSurface: '--inverse-surface',
  inverseOnSurface: '--inverse-on-surface',
  inversePrimary: '--inverse-primary',
  shadow: '--shadow',
  scrim: '--scrim',
  surfaceDim: '--surface-dim',
  surfaceBright: '--surface-bright',
  surfaceContainerLowest: '--surface-container-lowest',
  surfaceContainerLow: '--surface-container-low',
  surfaceContainer: '--surface-container',
  surfaceContainerHigh: '--surface-container-high',
  surfaceContainerHighest: '--surface-container-highest',
}

function buildScheme({ scheme, isDark }) {
  const json = scheme.toJSON()
  const palette = theme.palettes.neutral
  const values = new Map()

  for (const role of BASE_ROLES) {
    values.set(role, hexFromArgb(json[role]))
  }

  for (const [role, tone] of Object.entries(SURFACE_TONES[isDark ? 'dark' : 'light'])) {
    values.set(role, hexFromArgb(palette.tone(tone)))
  }

  const lines = []
  for (const [role, value] of values) {
    lines.push(`  --md-sys-color-${kebab(role)}: ${value};`)
  }
  lines.push('')
  for (const [role, name] of Object.entries(BEER_NAMES)) {
    const value = values.get(role)
    if (value) lines.push(`  ${name}: ${value};`)
  }
  lines.push(`  --surface-tint: ${hexFromArgb(theme.palettes.primary.tone(isDark ? 80 : 40))};`)
  lines.push(`  --background: ${values.get('surface')};`)
  lines.push(`  --on-background: ${values.get('onSurface')};`)

  return lines.join('\n')
}

const light = buildScheme({ scheme: theme.schemes.light, isDark: false })
const dark = buildScheme({ scheme: theme.schemes.dark, isDark: true })

const css = `/* 由 scripts/gen-theme.mjs 生成，种子色 ${SEED}。请勿手改。 */
:root,
body.light {
${light}

  color-scheme: light;
}

body.dark {
${dark}

  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  body:not(.light) {
${dark
  .split('\n')
  .map((l) => `  ${l}`)
  .join('\n')}

    color-scheme: dark;
  }
}
`

writeFileSync(new URL('../src/styles/theme.css', import.meta.url), css)
console.log(`theme.css 已生成，种子色 ${SEED}`)
