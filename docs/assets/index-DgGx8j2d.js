(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`);if(!e)throw Error(`App root was not found.`);var t=e,n=[{name:`Black`,value:`#050505`,textColor:`#f5f5f5`},{name:`White`,value:`#ffffff`,textColor:`#101010`},{name:`Red`,value:`#ff2b2b`,textColor:`#fff5f5`},{name:`Green`,value:`#00d46a`,textColor:`#03140a`},{name:`Blue`,value:`#005dff`,textColor:`#f3f7ff`}],r={mode:`idle`,colorIndex:0,isFullscreen:!1};function i(){return n[r.colorIndex]}function a(e=1){r.colorIndex=(r.colorIndex+e+n.length)%n.length,f()}async function o(){if(document.fullscreenEnabled)try{await document.documentElement.requestFullscreen()}catch{}}async function s(){if(document.fullscreenElement)try{await document.exitFullscreen()}catch{}}async function c(){r.mode=`testing`,r.colorIndex=0,f(),await o()}async function l(){r.mode=`idle`,f(),await s()}function u(){t.innerHTML=`
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
  `,t.querySelector(`[data-action="start"]`)?.addEventListener(`click`,()=>{c()})}function d(){let e=i();t.innerHTML=`
    <main
      class="test-surface"
      data-mode="testing"
      data-action="advance"
      style="--test-color: ${e.value}; --test-text: ${e.textColor};"
      aria-label="${e.name} pixel test surface"
    ></main>
  `,t.querySelector(`[data-action="advance"]`)?.addEventListener(`pointerup`,()=>a(1))}function f(){if(t.dataset.mode=r.mode,r.mode===`testing`){d();return}u()}document.addEventListener(`fullscreenchange`,()=>{r.isFullscreen=!!document.fullscreenElement,r.mode===`testing`&&f()}),document.addEventListener(`keydown`,e=>{if(r.mode===`testing`){if(e.key===`Escape`){e.preventDefault(),l();return}if(e.key===`ArrowRight`){e.preventDefault(),a(1);return}if(e.key===`ArrowLeft`){e.preventDefault(),a(-1);return}e.key===`Tab`||e.key===`Shift`||e.key===`Alt`||e.key===`Meta`||e.key===`Control`||(e.preventDefault(),a(1))}}),f();