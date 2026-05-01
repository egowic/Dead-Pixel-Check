# Dead Pixel Check

Dead Pixel Check is a lightweight fullscreen web app for quickly inspecting displays with solid test colors.

## Features

- Minimal landing screen with a single `Start Pixel Check` action
- Fullscreen test mode with solid `black`, `white`, `red`, `green`, and `blue` screens
- Keyboard, mouse, and touch-friendly navigation
- GitHub Pages deployment via GitHub Actions

## Controls

- `Space`, `Enter`, click, tap, or most keys: next color
- `ArrowLeft`: previous color
- `ArrowRight`: next color
- `Esc`: exit the test

## Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

This project is configured for GitHub Pages project-site deployment under `/Dead-Pixel-Check/`.

The source app lives in `src/` and the publishable static output is mirrored into `docs/` for GitHub Pages hosting.
