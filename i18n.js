(function(){
  const LANG_KEY = 'site.lang';
  const state = {
    dict: {
      pl: {
        'nav.back': '← Powrót',
        'sec.tech': 'Technologie',
        'sec.roadmap': 'Plan rozwoju'
      },
      en: {
        'nav.back': '← Back',
        'sec.tech': 'Technologies',
        'sec.roadmap': 'Roadmap'
      }
    },
    inited: false,
    observer: null
  };
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  function currentLang(){ return localStorage.getItem(LANG_KEY) || 'pl'; }
  function t(key, lang){ const L = lang || currentLang(); return (state.dict[L] && state.dict[L][key]) || (state.dict.pl && state.dict.pl[key]) || key; }

  function translateTree(root){
    const lang = currentLang();
    // title if key provided on <title data-i18n="page.title">
    const titleEl = (root.ownerDocument || document).querySelector('title[data-i18n]');
    if(titleEl){ titleEl.textContent = t(titleEl.getAttribute('data-i18n'), lang); }
    // text nodes
    $$('[data-i18n]', root).forEach(el=>{ if(el.tagName.toLowerCase()==='title') return; el.textContent = t(el.getAttribute('data-i18n'), lang); });
    // innerHTML bindings
    $$('[data-i18n-html]', root).forEach(el=>{ el.innerHTML = t(el.getAttribute('data-i18n-html'), lang); });
    // attribute bindings: data-i18n-attr-*
    const all = $$('*', root);
    all.forEach(el => {
      for(const attr of Array.from(el.attributes)){
        if(attr.name.startsWith('data-i18n-attr-')){
          const target = attr.name.replace('data-i18n-attr-','');
          const key = attr.value;
          if(target && key){ el.setAttribute(target, t(key, lang)); }
        }
      }
    });
    // Sync language picker value if present within scope or globally
    const sel = $('#langSwitcher'); if(sel) sel.value = lang;
  }

  function apply(){ translateTree(document); }
  function applyTo(root){ if(root) translateTree(root); }

  function setLang(lang){
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    apply();
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang } }));
  }

  function init(){
    const sel = $('#langSwitcher');
    if(sel && !sel.__i18nBound){ sel.addEventListener('change', e=> setLang(e.target.value)); sel.__i18nBound = true; }
    document.documentElement.setAttribute('lang', currentLang());
    apply();
    // Optional: observe dynamic DOM additions to auto-translate new nodes
    if(!state.observer){
      state.observer = new MutationObserver((mutations)=>{
        for(const m of mutations){
          m.addedNodes && m.addedNodes.forEach(node => {
            if(!(node instanceof HTMLElement)) return;
            // If it or its descendants carry i18n markers, translate this subtree
            if(node.hasAttribute?.('data-i18n') || node.hasAttribute?.('data-i18n-html')){
              applyTo(node);
            } else if(node.querySelector?.('[data-i18n], [data-i18n-html], [data-i18n-attr-]')){
              applyTo(node);
            }
          });
        }
      });
      state.observer.observe(document.documentElement, { childList: true, subtree: true });
    }
    state.inited = true;
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: currentLang() } }));
  }

  function applyDict(dict){
    state.dict.pl = Object.assign({}, state.dict.pl, dict.pl||{});
    state.dict.en = Object.assign({}, state.dict.en, dict.en||{});
    // Re-apply immediately so late dictionaries reflect on screen
    if(typeof document !== 'undefined') apply();
  }

  // Set lang attribute as early as possible to reduce perceived flicker
  try { document.documentElement.setAttribute('lang', currentLang()); } catch(_){}
  // Auto-init on DOM ready if the page forgets to call init()
  document.addEventListener('DOMContentLoaded', () => { if(!state.inited) init(); });

  window.SiteI18n = { init, apply: applyDict, applyTo, t, setLang, currentLang, observe: init };
})();
