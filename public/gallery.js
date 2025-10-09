(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  // Singleton overlay + state
  let overlay, imgEl, captionEl, btnPrev, btnNext, btnClose, backdrop, vp;
  let currentList = []; let currentIndex = 0;
  // baseScale ensures the image initially fits viewport; zoomScale is user zoom on top
  let baseScale=1, zoomScale=1, tx=0, ty=0, dragging=false, lastX=0, lastY=0;

  function ensureOverlay(){
    if(overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'lightbox hidden';
    overlay.innerHTML = `
      <div class="lightbox__backdrop"></div>
      <div class="lightbox__frame">
        <button class="lightbox__btn lightbox__close" aria-label="Zamknij">×</button>
        <button class="lightbox__btn lightbox__prev" aria-label="Poprzednie">‹</button>
        <button class="lightbox__btn lightbox__next" aria-label="Następne">›</button>
        <div class="lightbox__viewport"><img class="lightbox__img" alt="podgląd" /></div>
        <div class="lightbox__caption"></div>
      </div>`;
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('.lightbox__img');
    captionEl = overlay.querySelector('.lightbox__caption');
    btnPrev = overlay.querySelector('.lightbox__prev');
    btnNext = overlay.querySelector('.lightbox__next');
    btnClose = overlay.querySelector('.lightbox__close');
    backdrop = overlay.querySelector('.lightbox__backdrop');
    vp = overlay.querySelector('.lightbox__viewport');

    function applyTransform(){
      const s = baseScale * zoomScale;
      imgEl.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    }
    function resetZoom(){ zoomScale=1; tx=0; ty=0; applyTransform(); }
    function clampPan(){
      const rect = imgEl.getBoundingClientRect();
      const vpr = vp.getBoundingClientRect();
      const maxX = Math.max(0, (rect.width - vpr.width)/2) + 40;
      const maxY = Math.max(0, (rect.height - vpr.height)/2) + 40;
      tx = Math.min(maxX, Math.max(-maxX, tx));
      ty = Math.min(maxY, Math.max(-maxY, ty));
    }

    function show(index){
      if(!currentList.length) return;
      currentIndex = (index+currentList.length) % currentList.length;
      const item = currentList[currentIndex];
      // Load image and compute baseScale to fit into viewport; show after load
      imgEl.alt=item.alt||''; captionEl.textContent=item.caption||'';
      const onLoad = () => {
        // Guard: ensure we have actual dimensions
        if (!imgEl.naturalWidth || !imgEl.naturalHeight) return;
        const vpr = vp.getBoundingClientRect();
        const scaleW = (vpr.width - 24) / imgEl.naturalWidth;
        const scaleH = (vpr.height - 24) / imgEl.naturalHeight;
        baseScale = Math.min(Math.min(scaleW, scaleH), 4);
        zoomScale = 1; tx = 0; ty = 0; applyTransform();
        overlay.classList.remove('hidden'); document.body.style.overflow='hidden';
      };
      const onError = () => { overlay.classList.remove('hidden'); captionEl.textContent = (captionEl.textContent||'') + ' (nie udało się wczytać obrazu)'; };
      imgEl.onload = onLoad;
      imgEl.onerror = onError;
      imgEl.src = item.src;
      // If cached and already complete with valid size, trigger manually
      if (imgEl.complete && imgEl.naturalWidth) onLoad();
    }
    function close(){ overlay.classList.add('hidden'); document.body.style.overflow=''; }

    btnPrev.addEventListener('click', ()=>show(currentIndex-1));
    btnNext.addEventListener('click', ()=>show(currentIndex+1));
    btnClose.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    window.addEventListener('keydown', (e)=>{ if(overlay.classList.contains('hidden')) return; if(e.key==='Escape') close(); if(e.key==='ArrowRight') show(currentIndex+1); if(e.key==='ArrowLeft') show(currentIndex-1); });
    vp.addEventListener('wheel', (e)=>{
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * 0.2;
      const prev = zoomScale;
      zoomScale = Math.min(3, Math.max(1, zoomScale + delta));
      // Optional: zoom to cursor — adjust pan so point under cursor stays roughly in place
      const vpr = vp.getBoundingClientRect();
      const cx = e.clientX - (vpr.left + vpr.width/2);
      const cy = e.clientY - (vpr.top + vpr.height/2);
      const factor = zoomScale/prev;
      tx = cx - (cx - tx) * factor;
      ty = cy - (cy - ty) * factor;
      clampPan(); applyTransform();
    }, {passive:false});
    imgEl.addEventListener('dblclick', ()=>{ zoomScale = zoomScale>1 ? 1 : 2; clampPan(); applyTransform(); });
    function startDrag(e){ if(zoomScale===1) return; dragging=true; lastX=(e.touches?e.touches[0].clientX:e.clientX); lastY=(e.touches?e.touches[0].clientY:e.clientY); imgEl.style.cursor='grabbing'; }
    function moveDrag(e){ if(!dragging) return; const x=(e.touches?e.touches[0].clientX:e.clientX), y=(e.touches?e.touches[0].clientY:e.clientY); tx += x-lastX; ty += y-lastY; lastX=x; lastY=y; clampPan(); applyTransform(); }
    function endDrag(){ dragging=false; imgEl.style.cursor='grab'; }
    imgEl.addEventListener('mousedown', startDrag); window.addEventListener('mousemove', moveDrag); window.addEventListener('mouseup', endDrag);
    imgEl.addEventListener('touchstart', startDrag, {passive:true}); window.addEventListener('touchmove', moveDrag, {passive:false}); window.addEventListener('touchend', endDrag);

    // Expose for inner closures
    overlay._show = show; overlay._resetZoom = resetZoom;
  }

  function bind(){
    ensureOverlay();
    const galleries = Array.from(document.querySelectorAll('.gallery'));
    if(!galleries.length) return;

    galleries.forEach(gal=>{
      if(gal.dataset.lbBound==='1') return; // bind once per gallery
      gal.dataset.lbBound='1';
      gal.addEventListener('click', (e)=>{
        const target = e.target.closest('img');
        if(!target) return;
        // Ignore clicks coming from the thumbnails strip
        if (e.target.closest('.carousel__thumbs')) return;
        // ignoruj klik w miniatury, jeśli nie chcemy powiększać z miniatur — tutaj pozwalamy też z miniatur
        // Zbierz listę dużych slajdów (bez miniaturek)
        let imgs = gal.querySelectorAll('.carousel__track img');
        if(!imgs.length) imgs = gal.querySelectorAll('figure img');
        if(!imgs.length) imgs = gal.querySelectorAll('img');
        const list = Array.from(imgs);
        const idx = list.indexOf(target) !== -1 ? list.indexOf(target) : list.findIndex(i=> i.src===target.src);
        if(idx===-1) return;
        currentList = list.map(img=>({
          src: img.getAttribute('data-full') || img.src,
          alt: img.alt,
          caption: img.dataset.caption || (img.closest('figure') && img.closest('figure').querySelector('figcaption') ? img.closest('figure').querySelector('figcaption').textContent : '')
        }));
        overlay._show(idx);
      });
    });
  }

  ready(bind);
  document.addEventListener('gallery:updated', bind);
})();
