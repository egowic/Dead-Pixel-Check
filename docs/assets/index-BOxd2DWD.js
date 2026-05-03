(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`);if(!e)throw Error(`App root was not found.`);var t=e,n=[{name:`Black`,value:`#000000`,textColor:`#f5f5f5`},{name:`White`,value:`#ffffff`,textColor:`#101010`},{name:`Red`,value:`#ff0000`,textColor:`#fff5f5`},{name:`Green`,value:`#00ff00`,textColor:`#03140a`},{name:`Blue`,value:`#0000ff`,textColor:`#f3f7ff`}],r={mode:`idle`,colorIndex:0,isFullscreen:!1},i=!1,a=!1;function o(){return n[r.colorIndex]}function s(e=1){r.colorIndex=(r.colorIndex+e+n.length)%n.length,g()}async function c(){if(document.fullscreenEnabled)try{await document.documentElement.requestFullscreen()}catch{}}function l(){let e=t.querySelector(`[data-action="advance"]`);try{e?.requestPointerLock()}catch{}}function u(){if(document.pointerLockElement)try{document.exitPointerLock()}catch{}}async function d(){if(document.fullscreenElement)try{await document.exitFullscreen()}catch{}}async function f(){r.mode=`testing`,r.colorIndex=0,g(),l(),await c()}async function p(){r.mode===`idle`||i||(i=!0,u(),await d(),r.mode=`idle`,g(),i=!1)}function m(){t.innerHTML=`
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
  `,t.querySelector(`[data-action="start"]`)?.addEventListener(`click`,()=>{f()})}function h(){let e=o();t.innerHTML=`
    <main
      class="test-surface"
      data-mode="testing"
      data-action="advance"
      style="--test-color: ${e.value}; --test-text: ${e.textColor};"
      aria-label="${e.name} pixel test surface"
    ></main>
  `,t.querySelector(`[data-action="advance"]`)?.addEventListener(`pointerup`,()=>s(1))}function g(){if(document.documentElement.dataset.mode=r.mode,t.dataset.mode=r.mode,r.mode===`testing`){h();return}m()}document.addEventListener(`fullscreenchange`,()=>{if(r.isFullscreen=!!document.fullscreenElement,r.mode===`testing`&&!r.isFullscreen){r.mode=`idle`,g();return}r.mode===`testing`&&g()}),document.addEventListener(`pointerlockchange`,()=>{let e=a;a=!!document.pointerLockElement,r.mode===`testing`&&e&&!a&&p()}),document.addEventListener(`keydown`,e=>{if(r.mode===`testing`){if(e.key===`Escape`){e.preventDefault(),p();return}if(e.key===`ArrowRight`){e.preventDefault(),s(1);return}if(e.key===`ArrowLeft`){e.preventDefault(),s(-1);return}e.key===`Tab`||e.key===`Shift`||e.key===`Alt`||e.key===`Meta`||e.key===`Control`||(e.preventDefault(),s(1))}}),g();