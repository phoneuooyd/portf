(function(){
  // Resolve paths relative to this script file
  const _script = document.currentScript || (function(){ const s=document.getElementsByTagName('script'); return s[s.length-1]; })();
  const _baseDir = _script && _script.src ? _script.src.substring(0, _script.src.lastIndexOf('/')) : '';
  function create(root){
    const state={turn:0, cells:Array(9).fill(0), p1:0, p2:0, win:false};
    const ui={};
    root.innerHTML=`
      <link rel="stylesheet" href="${_baseDir}/tictactoe.css">
      <div class="tictactoe">
        <div class="left">
          <div class="status" id="ttt-status">Gracz 1</div>
          <div class="toolbar">
            <button id="ttt-new">Nowa gra</button>
          </div>
          <div class="board" id="ttt-board">
            ${Array.from({length:9}).map((_,i)=>`<div class="cell" data-id="${i}"></div>`).join("")}
          </div>
        </div>
        <div class="score">
          <div class="head">Punkty</div>
          <div class="player"><span>Gracz 1</span><span id="ttt-p1">0</span></div>
          <div class="player"><span>Gracz 2</span><span id="ttt-p2">0</span></div>
        </div>
      </div>`;

    ui.status=root.querySelector('#ttt-status');
    ui.board=root.querySelector('#ttt-board');
    ui.p1=root.querySelector('#ttt-p1');
    ui.p2=root.querySelector('#ttt-p2');
    ui.newBtn=root.querySelector('#ttt-new');

    let O = `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"26\" stroke=\"%23164747\" stroke-width=\"10\" fill=\"none\"/></svg>')`;
    let X = `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M20 20 L80 80 M80 20 L20 80\" stroke=\"%23164747\" stroke-width=\"10\" stroke-linecap=\"round\"/></svg>')`;

    // Optional: if image assets are provided, use them instead of SVG
    (function tryLoadAssets(){
      const base = _baseDir + '/images/';
      const imgO = new Image();
      const imgX = new Image();
      let loaded=0;
      function done(){
        if(++loaded===2){
          O = `url('${base}img2.jpg')`;
          X = `url('${base}img.jpg')`;
        }
      }
      imgO.onload=done; imgX.onload=done;
      imgO.onerror=()=>{}; imgX.onerror=()=>{};
      imgO.src=base+'img2.jpg';
      imgX.src=base+'img.jpg';
    })();

    function setStatus(){ ui.status.textContent = state.win ? ui.status.textContent : (state.turn%2===0? 'Gracz 1':'Gracz 2'); }

    function checkWin(){
      const c=state.cells;
      const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for(const [a,b,d] of lines){
        if(c[a]&&c[a]===c[b]&&c[a]===c[d]){ return c[a]; }
      }
      return 0;
    }

    function paintCell(el,val){
      el.style.backgroundImage = val===1 ? O : X;
    }

    function resetBoard(){
      state.cells.fill(0);
      state.turn=0; state.win=false;
      ui.status.textContent='';
      setStatus();
      ui.board.querySelectorAll('.cell').forEach(c=>{c.style.backgroundImage='none';});
    }

    function clickCell(e){
      const el=e.target.closest('.cell');
      if(!el||state.win) return;
      const id=+el.dataset.id;
      if(state.cells[id]) return;
      const mark = (state.turn%2===0)? 1 : 2; // 1 -> O (Gracz 1), 2 -> X (Gracz 2)
      state.cells[id]=mark;
      paintCell(el, mark===1?1:2);
      const winner=checkWin();
      if(winner){
        state.win=true;
        ui.status.textContent = winner===1? 'Gracz 1 wygrał!' : 'Gracz 2 wygrał!';
        if(winner===1){ state.p1++; ui.p1.textContent=state.p1; } else { state.p2++; ui.p2.textContent=state.p2; }
        return;
      }
      state.turn++;
      setStatus();
    }

    ui.board.addEventListener('click', clickCell);
    ui.newBtn.addEventListener('click', resetBoard);
    setStatus();
  }

  window.TicTacToeComponent={ mount:(selector)=>{
    const host = (typeof selector==='string')? document.querySelector(selector):selector;
    if(!host) return;
    create(host);
  }};
})();
