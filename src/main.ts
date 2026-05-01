import './style.css'

type Mode = 'idle' | 'testing'

type ColorStep = {
  name: string
  value: string
  textColor: string
}

const appRoot = document.querySelector<HTMLDivElement>('#app')

if (!appRoot) {
  throw new Error('App root was not found.')
}

const app = appRoot

const colorSequence: ColorStep[] = [
  { name: 'Black', value: '#050505', textColor: '#f5f5f5' },
  { name: 'White', value: '#ffffff', textColor: '#101010' },
  { name: 'Red', value: '#ff2b2b', textColor: '#fff5f5' },
  { name: 'Green', value: '#00d46a', textColor: '#03140a' },
  { name: 'Blue', value: '#005dff', textColor: '#f3f7ff' },
]

const state = {
  mode: 'idle' as Mode,
  colorIndex: 0,
  isFullscreen: false,
}

function getCurrentColor(): ColorStep {
  return colorSequence[state.colorIndex]
}

function advanceColor(direction: 1 | -1 = 1) {
  state.colorIndex =
    (state.colorIndex + direction + colorSequence.length) % colorSequence.length
  render()
}

async function enterFullscreen() {
  if (!document.fullscreenEnabled) {
    return
  }

  try {
    await document.documentElement.requestFullscreen()
  } catch {
    // Fullscreen can be denied by the browser; the test should still work.
  }
}

async function exitFullscreen() {
  if (!document.fullscreenElement) {
    return
  }

  try {
    await document.exitFullscreen()
  } catch {
    // Ignore exit failures and continue restoring the idle state.
  }
}

async function startTest() {
  state.mode = 'testing'
  state.colorIndex = 0
  render()
  await enterFullscreen()
}

async function stopTest() {
  state.mode = 'idle'
  render()
  await exitFullscreen()
}

function renderIdleView() {
  app.innerHTML = `
    <main class="shell">
      <section class="hero-panel" aria-labelledby="hero-title">
        <p class="eyebrow">Display diagnostics</p>
        <h1 id="hero-title">Dead Pixel Check</h1>
        <p class="lede">
          Run a fast, distraction-free color cycle to inspect your screen for dead or stuck pixels.
        </p>
        <div class="actions">
          <button class="primary-button" type="button" data-action="start">
            Start Pixel Check
          </button>
        </div>
        <p class="support-copy">
          Test colors: Black, White, Red, Green, Blue
        </p>
        <p class="support-copy">
          During the test, press <kbd>Space</kbd>, <kbd>Enter</kbd>, click, or tap to move forward. Press <kbd>Esc</kbd> to exit.
        </p>
      </section>
    </main>
  `

  const startButton = app.querySelector<HTMLButtonElement>('[data-action="start"]')
  startButton?.addEventListener('click', () => {
    void startTest()
  })
}

function renderTestingView() {
  const currentColor = getCurrentColor()

  app.innerHTML = `
    <main
      class="test-surface"
      data-mode="testing"
      data-action="advance"
      style="--test-color: ${currentColor.value}; --test-text: ${currentColor.textColor};"
      aria-label="${currentColor.name} pixel test surface"
    ></main>
  `

  const testSurface = app.querySelector<HTMLElement>('[data-action="advance"]')
  testSurface?.addEventListener('pointerup', () => advanceColor(1))
}

function render() {
  app.dataset.mode = state.mode

  if (state.mode === 'testing') {
    renderTestingView()
    return
  }

  renderIdleView()
}

document.addEventListener('fullscreenchange', () => {
  state.isFullscreen = Boolean(document.fullscreenElement)

  if (state.mode === 'testing') {
    render()
  }
})

document.addEventListener('keydown', (event) => {
  if (state.mode !== 'testing') {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    void stopTest()
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    advanceColor(1)
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    advanceColor(-1)
    return
  }

  if (
    event.key === 'Tab' ||
    event.key === 'Shift' ||
    event.key === 'Alt' ||
    event.key === 'Meta' ||
    event.key === 'Control'
  ) {
    return
  }

  event.preventDefault()
  advanceColor(1)
})

render()
