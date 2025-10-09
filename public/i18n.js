(function(){
  const LANG_KEY = 'site.lang';
  const state = { dict: { pl: {}, en: {} } };
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  function currentLang(){ return localStorage.getItem(LANG_KEY) || 'pl'; }
  function setLang(lang){ localStorage.setItem(LANG_KEY, lang); document.documentElement.setAttribute('lang', lang); apply(); }
  function t(key, lang){ const L = lang || currentLang(); return (state.dict[L] && state.dict[L][key]) || (state.dict.pl && state.dict.pl[key]) || key; }

  function apply(){
    const lang = currentLang();
    // title if key provided on <title data-i18n="page.title">
    const titleEl = document.querySelector('title[data-i18n]');
    if(titleEl){ titleEl.textContent = t(titleEl.getAttribute('data-i18n'), lang); }
    $$('[data-i18n]').forEach(el=>{ if(el.tagName.toLowerCase()==='title') return; el.textContent = t(el.getAttribute('data-i18n'), lang); });
    const sel = $('#langSwitcher'); if(sel) sel.value = lang;
  }

  function init(){
    const sel = $('#langSwitcher');
    if(sel){ sel.addEventListener('change', e=> setLang(e.target.value)); }
    document.documentElement.setAttribute('lang', currentLang());
    apply();
  }

  function applyDict(dict){
    state.dict.pl = Object.assign({}, state.dict.pl, dict.pl||{});
    state.dict.en = Object.assign({}, state.dict.en, dict.en||{});
  }

  window.SiteI18n = { init, apply: applyDict, t, setLang, currentLang };
})();
