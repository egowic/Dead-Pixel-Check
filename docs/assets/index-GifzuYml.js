(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`);if(!e)throw Error(`App root was not found.`);var t=e,n=[{name:`Black`,value:`#050505`,textColor:`#f5f5f5`},{name:`White`,value:`#ffffff`,textColor:`#101010`},{name:`Red`,value:`#ff2b2b`,textColor:`#fff5f5`},{name:`Green`,value:`#00d46a`,textColor:`#03140a`},{name:`Blue`,value:`#005dff`,textColor:`#f3f7ff`}],r={mode:`idle`,colorIndex:0,isFullscreen:!1},i=!1;function a(){return n[r.colorIndex]}function o(e=1){r.colorIndex=(r.colorIndex+e+n.length)%n.length,p()}async function s(){if(document.fullscreenEnabled)try{await document.documentElement.requestFullscreen()}catch{}}async function c(){if(document.fullscreenElement)try{await document.exitFullscreen()}catch{}}async function l(){r.mode=`testing`,r.colorIndex=0,p(),await s()}async function u(){r.mode===`idle`||i||(i=!0,await c(),r.mode=`idle`,p(),i=!1)}function d(){t.innerHTML=`
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
  `,t.querySelector(`[data-action="start"]`)?.addEventListener(`click`,()=>{l()})}function f(){let e=a();t.innerHTML=`
    <main
      class="test-surface"
      data-mode="testing"
      data-action="advance"
      style="--test-color: ${e.value}; --test-text: ${e.textColor};"
      aria-label="${e.name} pixel test surface"
    ></main>
  `,t.querySelector(`[data-action="advance"]`)?.addEventListener(`pointerup`,()=>o(1))}function p(){if(t.dataset.mode=r.mode,r.mode===`testing`){f();return}d()}document.addEventListener(`fullscreenchange`,()=>{if(r.isFullscreen=!!document.fullscreenElement,r.mode===`testing`&&!r.isFullscreen){r.mode=`idle`,p();return}r.mode===`testing`&&p()}),document.addEventListener(`keydown`,e=>{if(r.mode===`testing`){if(e.key===`Escape`){e.preventDefault(),u();return}if(e.key===`ArrowRight`){e.preventDefault(),o(1);return}if(e.key===`ArrowLeft`){e.preventDefault(),o(-1);return}e.key===`Tab`||e.key===`Shift`||e.key===`Alt`||e.key===`Meta`||e.key===`Control`||(e.preventDefault(),o(1))}}),p();