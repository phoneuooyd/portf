(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    document.querySelectorAll('[data-carousel]')?.forEach(init);
  });

  function init(root){
    const list = Array.from(root.querySelectorAll('img'));
    if(!list.length) return;
    root.classList.add('carousel');
      const viewport = document.createElement('div');
      viewport.className='carousel__viewport';
      const track = document.createElement('div');
      track.className='carousel__track';
      list.forEach(img=>{ 
        // zachowaj podpis oryginalnej figcaption, jeśli był
        const cap = (img.closest('figure') && img.closest('figure').querySelector('figcaption')) ? img.closest('figure').querySelector('figcaption').textContent : '';
        if(cap) img.dataset.caption = cap;
        const slide=document.createElement('div'); slide.className='carousel__slide'; img.loading='lazy'; slide.appendChild(img); track.appendChild(slide); 
      });
      viewport.appendChild(track);
      const btnPrev = document.createElement('button'); btnPrev.className='carousel__btn prev'; btnPrev.innerHTML='‹';
      const btnNext = document.createElement('button'); btnNext.className='carousel__btn next'; btnNext.innerHTML='›';
      const dots = document.createElement('div'); dots.className='carousel__dots';
      const bullets = list.map((_,i)=>{ const b=document.createElement('button'); b.className='carousel__dot'; b.setAttribute('aria-label', 'slide '+(i+1)); dots.appendChild(b); return b; });
      const thumbs = document.createElement('div'); thumbs.className='carousel__thumbs';
      const thumbBtns = list.map((img,i)=>{ const t=document.createElement('button'); t.className='carousel__thumb'; const ti=document.createElement('img'); ti.src=img.src; ti.alt=img.alt||('miniatura '+(i+1)); t.appendChild(ti); thumbs.appendChild(t); return t; });
      root.innerHTML='';
    // Kolejność (wiersze): obraz (viewport), kropki, miniatury
    root.appendChild(viewport); 
    root.appendChild(dots); 
    root.appendChild(thumbs);
    // Nawigacja jest osadzona w viewport
    viewport.appendChild(btnPrev); 
    viewport.appendChild(btnNext);

    let index=0; let w=0; let resizeId; let wasSwipe=false;
    function measure(){ w = viewport.clientWidth; track.style.width = (list.length * w)+'px'; Array.from(track.children).forEach(sl=>{ sl.style.width=w+'px'; }); go(index, false); }
      function go(i, animate=true){ 
        index=(i+list.length)%list.length; 
        track.style.transition = animate?'transform .35s ease':''; 
        track.style.transform='translateX(' + (-index*w) + 'px)'; 
        bullets.forEach((b,bi)=>{ b.classList.toggle('is-active', bi===index); }); 
        thumbBtns.forEach((b,bi)=>{ b.classList.toggle('is-active', bi===index); });
        // expose current index for other components
        root.dataset.index = String(index);
        // auto-scroll miniatur do aktywnej
        const activeThumb = thumbBtns[index];
        if(activeThumb && thumbs.scrollWidth>thumbs.clientWidth){ const r=activeThumb.getBoundingClientRect(); const pr=thumbs.getBoundingClientRect(); if(r.left<pr.left||r.right>pr.right){ thumbs.scrollTo({left: activeThumb.offsetLeft - pr.width/2 + activeThumb.offsetWidth/2, behavior:'smooth'}); } }
      }
    btnPrev.addEventListener('click', ()=>go(index-1));
    btnNext.addEventListener('click', ()=>go(index+1));
    bullets.forEach((b,i)=>b.addEventListener('click', ()=>go(i)));
  thumbBtns.forEach((b,i)=>b.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); go(i); }));

    // swipe
    let startX=0, dx=0, dragging=false;
    viewport.addEventListener('pointerdown', (e)=>{ 
      // Jeśli klik na strzałce, nie zaczynaj drag
      if(e.target.closest('.carousel__btn')) return; 
      dragging=true; wasSwipe=false; startX=e.clientX; dx=0; viewport.setPointerCapture(e.pointerId); track.style.transition='none'; 
    });
    viewport.addEventListener('pointermove', (e)=>{ if(!dragging) return; dx=e.clientX-startX; if(Math.abs(dx)>6) wasSwipe=true; track.style.transform='translateX(' + ((-index*w)+dx) + 'px)'; });
    function end(){ if(!dragging) return; dragging=false; if(Math.abs(dx)>w*0.2){ go(index+(dx<0?1:-1)); } else { go(index); } }
    viewport.addEventListener('pointerup', end); viewport.addEventListener('pointercancel', end); viewport.addEventListener('pointerleave', end);

    // Kliknięcie w główny obraz (viewport) otwiera powiększenie jak klik w miniaturę
    viewport.addEventListener('click', (e)=>{
      if(e.target.closest('.carousel__btn')) return; // strzałki nie otwierają lightboxa
      if(wasSwipe) return; // ignoruj klik po gestach przesuwania
      // jeśli kliknięto bezpośrednio w obraz w slajdzie, delegacja z gallery.js to obsłuży
      if(e.target.closest('.carousel__slide img')) return;
      const imgs = track.querySelectorAll('img');
      const curr = imgs[index];
      if(curr){ curr.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
    });

    window.addEventListener('resize', ()=>{ clearTimeout(resizeId); resizeId=setTimeout(measure, 80); });
    measure();
    // poinformuj lightbox, że galeria została przebudowana
    document.dispatchEvent(new CustomEvent('gallery:updated', { detail: { root } }));
  }
})();