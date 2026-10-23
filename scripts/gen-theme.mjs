// 从种子色生成 M3 完整的 light/dark 色板。
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

function buildScheme({ scheme, isDark }) {
  const json = scheme.toJSON()
  const palette = theme.palettes.neutral
  const lines = []

  for (const role of BASE_ROLES) {
    lines.push(`  --md-sys-color-${kebab(role)}: ${hexFromArgb(json[role])};`)
  }

  for (const [role, tone] of Object.entries(SURFACE_TONES[isDark ? 'dark' : 'light'])) {
    lines.push(`  --md-sys-color-${kebab(role)}: ${hexFromArgb(palette.tone(tone))};`)
  }

  lines.push(
    `  --md-sys-color-surface-tint: ${hexFromArgb(theme.palettes.primary.tone(isDark ? 80 : 40))};`,
  )

  return lines.join('\n')
}

const css = `/* 由 scripts/gen-theme.mjs 生成，种子色 ${SEED}。请勿手改。 */
:root {
${buildScheme({ scheme: theme.schemes.light, isDark: false })}

  color-scheme: light;
}

[data-theme='dark'] {
${buildScheme({ scheme: theme.schemes.dark, isDark: true })}

  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${buildScheme({ scheme: theme.schemes.dark, isDark: true })
  .split('\n')
  .map((l) => `  ${l}`)
  .join('\n')}

    color-scheme: dark;
  }
}
`

writeFileSync(new URL('../src/styles/theme.css', import.meta.url), css)
console.log(`theme.css 已生成，种子色 ${SEED}`)
