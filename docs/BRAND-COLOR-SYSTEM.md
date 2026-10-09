# Hilaac Electronics Brand Color System

## Brand direction

**Hilaac Ember** is a confident, warm, technology-aware identity for a Somali electronics business. It avoids the standard navy-blue SaaS palette and avoids generic AI purple.

The visual idea is:

```text
Electric energy + trusted commerce + warm human service
```

The palette uses a dark charcoal foundation, saffron as the distinctive brand accent, warm ivory for readable surfaces, and restrained natural status colors.

## Core brand palette

| Token | Hex | Role |
|---|---|---|
| `--brand-obsidian` | `#17191B` | Primary shell, header, deep surfaces |
| `--brand-charcoal` | `#24282B` | Elevated dark surfaces |
| `--brand-saffron` | `#F2A900` | Primary brand accent and key actions |
| `--brand-saffron-light` | `#FFC44D` | Hover, highlight, selected states |
| `--brand-ivory` | `#FFF8EA` | Main light background and readable surface |
| `--brand-sand` | `#E8D8BA` | Soft borders, muted panels, secondary surface |
| `--brand-ink` | `#202326` | Primary light-mode text |
| `--brand-muted` | `#667078` | Secondary text, metadata, helper text |

## Semantic colors

These are functional colors, not competing brand accents:

| Token | Hex | Role |
|---|---|---|
| `--color-success` | `#2E7D5B` | Approved, completed, healthy |
| `--color-warning` | `#B96818` | Pending, attention, retry |
| `--color-danger` | `#B94A48` | Rejected, failed, destructive |
| `--color-info` | `#527A78` | Informational state only |

Never communicate status by color alone. Pair color with text or an icon.

## Light theme

```css
:root {
  --background: #FFF8EA;
  --foreground: #202326;
  --surface: #FFFFFF;
  --surface-subtle: #F4EBDD;
  --surface-muted: #E8D8BA;
  --border: #D8C8A9;
  --brand: #F2A900;
  --brand-hover: #D98F00;
  --brand-foreground: #17191B;
  --muted-foreground: #667078;
}
```

## Dark theme

```css
.dark {
  --background: #17191B;
  --foreground: #FFF8EA;
  --surface: #24282B;
  --surface-subtle: #2D3336;
  --surface-muted: #3A4043;
  --border: #485054;
  --brand: #FFC44D;
  --brand-hover: #F2A900;
  --brand-foreground: #17191B;
  --muted-foreground: #B8B3A7;
}
```

## Usage rules

- Use Saffron for one primary action per screen, active navigation, important highlights, and approval controls.
- Do not use Saffron for every badge, icon, border, or decorative element.
- Use Obsidian and Charcoal to establish the application shell and hierarchy.
- Use Ivory and Sand for light surfaces and separation.
- Use semantic status colors only for actual states.
- Do not add blue, purple, cyan, or pink as extra decorative accents.
- Do not use pure black or pure white as the main surfaces.
- Maintain WCAG AA contrast for text and controls in both themes.
- Keep the whole application within one warm charcoal, saffron, ivory visual family.

## Brand personality

```text
Energetic, practical, trustworthy, warm, capable, local, modern.
```

Hilaac means lightning. Saffron represents energy and attention without turning the interface into a neon technology cliché.
