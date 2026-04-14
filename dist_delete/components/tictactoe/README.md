TicTacToe mini component

Usage on a project page:

<div id="live-ttt"></div>
<script src="../../components/tictactoe/tictactoe.js"></script>
<script>
  window.TicTacToeComponent.mount('#live-ttt');
</script>

Assets
- By default the component draws X and O with inline SVG.
- To replace with images, put your files here: public/components/tictactoe/images/img.jpg and img2.jpg and tweak tictactoe.js to use them (change O and X variables to point at '../../components/tictactoe/images/img2.jpg' and '.../img.jpg').
