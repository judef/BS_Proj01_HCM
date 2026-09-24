const game = {
	board: Array(9).fill(''),
	turn: 'X',
	over: false,
	mode: 'computer',
	scores: { X: 0, O: 0, draw: 0 }
};

const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
document.body.innerHTML = `
	<main class="app">
		<header><div><small>TIC TAC TOE</small><h1>Grid <i>Battle</i></h1><p>Think ahead. Own the board.</p></div><button id="theme">☾</button></header>
		<nav><button class="mode active" data-mode="computer">VS COMPUTER</button><button class="mode" data-mode="local">LOCAL DUEL</button><select id="level"><option value="easy">Easy</option><option value="hard" selected>Impossible</option></select></nav>
		<section class="scores"><div>X <b id="sx">0</b></div><div>DRAWS <b id="sd">0</b></div><div>O <b id="so">0</b></div></section>
		<p id="message">Your turn <b>×</b></p><div id="board"></div>
		<div class="buttons"><button id="new">NEW GAME</button><button id="undo">UNDO</button></div><footer>First to align three marks wins</footer>
	</main>`;

const css = document.createElement('style');
css.textContent = `
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;background:radial-gradient(circle at top,#282a45,#10111a 65%);color:#f5f5fa;font:14px system-ui}.app{width:min(500px,100%)}header{display:flex;justify-content:space-between;align-items:start;margin-bottom:30px}small{color:#888aff;letter-spacing:3px;font-weight:bold}h1{font-size:45px;line-height:1;margin:8px 0}i{color:#888aff;font-style:normal}p,footer{color:#9697a5}header button,nav button,select,.buttons button{border:1px solid #38394a;background:#1b1d2a;color:#ddd;border-radius:8px;padding:10px;cursor:pointer}header button{font-size:20px;width:44px}nav{display:flex;gap:5px;align-items:center;margin-bottom:22px}nav .active{background:#888aff;color:#111}select{margin-left:auto}.scores{display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;border-block:1px solid #2d2e3c;padding:16px}.scores div+div{border-left:1px solid #2d2e3c}.scores b{display:block;font-size:25px;margin-top:4px}#message{text-align:center;margin:25px 0 15px}#message b{font-size:24px;color:#888aff}#board{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.cell{aspect-ratio:1;border:1px solid #3a3b4d;border-radius:14px;background:#1a1c29;color:#888aff;font-size:clamp(55px,15vw,80px);font-weight:bold;cursor:pointer}.cell.o{color:#ff719d}.cell.win{background:#34365b;border-color:#888aff}.buttons{text-align:center;margin:22px}.buttons button{margin:4px}.buttons #new{background:#888aff;color:#111;border-color:#888aff}footer{text-align:center;font-size:12px}@media(max-width:450px){nav{flex-wrap:wrap}select{margin-left:0}}
body.light{background:linear-gradient(135deg,#e9eaff,#fff);color:#171827}body.light .cell,body.light nav button,body.light select,body.light header button{background:#fff;color:#171827}
`;
document.head.appendChild(css);

const board = document.querySelector('#board');
const message = document.querySelector('#message');
const result = () => wins.find(line => game.board[line[0]] && line.every(i => game.board[i] === game.board[line[0]]));
function render() {
	board.innerHTML = game.board.map((v, i) => `<button class="cell ${v === 'O' ? 'o' : ''}" data-i="${i}" ${v || game.over ? 'disabled' : ''}>${v === 'X' ? '×' : v === 'O' ? '○' : ''}</button>`).join('');
	document.querySelector('#sx').textContent = game.scores.X; document.querySelector('#so').textContent = game.scores.O; document.querySelector('#sd').textContent = game.scores.draw;
}
function play(i) {
	if (game.over || game.board[i]) return;
	game.board[i] = game.turn; const win = result();
	if (win || game.board.every(Boolean)) { game.over = true; if (win) { game.scores[game.turn]++; message.innerHTML = `${game.turn === 'X' ? '×' : '○'} wins!`; win.forEach(i => setTimeout(() => board.children[i].classList.add('win'), 0)); } else { game.scores.draw++; message.textContent = 'Draw game!'; } render(); return; }
	game.turn = game.turn === 'X' ? 'O' : 'X'; message.innerHTML = `${game.mode === 'computer' && game.turn === 'O' ? 'Computer' : 'Player'} turn <b>${game.turn === 'X' ? '×' : '○'}</b>`; render();
	if (game.mode === 'computer' && game.turn === 'O') setTimeout(computer, 300);
}
function computer() { const open = game.board.map((v,i) => v ? -1 : i).filter(i => i >= 0); let i = open[Math.floor(Math.random()*open.length)]; if (document.querySelector('#level').value === 'hard') i = open.includes(4) ? 4 : i; play(i); }
function reset() { game.board.fill(''); game.turn = 'X'; game.over = false; message.innerHTML = 'Your turn <b>×</b>'; render(); }
board.onclick = e => play(Number(e.target.dataset.i)); document.querySelector('#new').onclick = reset;
document.querySelector('#undo').onclick = () => { if (!game.over) { const last = game.board.lastIndexOf(game.turn === 'X' ? 'O' : 'X'); if (last > -1) game.board[last] = ''; game.turn = 'X'; render(); } };
document.querySelectorAll('.mode').forEach(b => b.onclick = () => { game.mode = b.dataset.mode; document.querySelectorAll('.mode').forEach(x => x.classList.toggle('active', x === b)); reset(); });
document.querySelector('#theme').onclick = () => { document.body.classList.toggle('light'); };
render();
