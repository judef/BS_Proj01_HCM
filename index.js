const animals = (name, kind, color, detail, accent, pattern = 'plain') => ({ name, kind, color, detail, accent, pattern });
const categories = [
	{
		name: 'Snakes',
		matchups: [
			[animals('Cobra', 'snake', '#d4a34e', '#b47b36', '#f3d97c', 'hood'), animals('Python', 'snake', '#8a6845', '#d7bd8c', '#483c30', 'spots')],
			[animals('Rattlesnake', 'snake', '#b77d42', '#e7c57b', '#6b4b2e', 'bands'), animals('Viper', 'snake', '#71874c', '#a7b26a', '#4a5f37')],
			[animals('King Cobra', 'snake', '#815c3a', '#bd9862', '#e2c187', 'hood'), animals('Anaconda', 'snake', '#597344', '#b5a64f', '#394b31', 'spots')],
			[animals('Coral Snake', 'snake', '#e2c9a1', '#d44837', '#242424', 'bands'), animals('Boa', 'snake', '#977047', '#d6b477', '#634934', 'spots')],
			[animals('Sea Snake', 'snake', '#355f65', '#d7c67a', '#f0eee0', 'bands'), animals('Black Mamba', 'snake', '#343539', '#65666b', '#c8a17c')]
		]
	},
	{
		name: 'Mammals',
		matchups: [
			[animals('Lion', 'mammal', '#d68b35', '#f0c16f', '#754522', 'mane'), animals('Tiger', 'mammal', '#df8e37', '#f7e8c9', '#382b22', 'stripes')],
			[animals('Wolf', 'mammal', '#858b8e', '#c8c9c0', '#454b4c'), animals('Fox', 'mammal', '#cb6335', '#f1d5a3', '#52362c')],
			[animals('Elephant', 'mammal', '#858e91', '#bbc2bd', '#555d60'), animals('Rhinoceros', 'mammal', '#797e79', '#c0b9a8', '#484d49')],
			[animals('Zebra', 'mammal', '#e7e1d0', '#ffffff', '#282a2a', 'stripes'), animals('Giraffe', 'mammal', '#e5ad4e', '#f5d98a', '#8d542b', 'spots')],
			[animals('Brown Bear', 'mammal', '#76503b', '#a77b55', '#392b26'), animals('Gorilla', 'mammal', '#393c3d', '#777b78', '#202425')]
		]
	},
	{
		name: 'Birds',
		matchups: [
			[animals('Eagle', 'bird', '#815b37', '#e4d6b9', '#e5aa35'), animals('Owl', 'bird', '#99714a', '#dbc493', '#ddad50', 'spots')],
			[animals('Parrot', 'bird', '#40a66d', '#e8cb3c', '#d34a35'), animals('Toucan', 'bird', '#20292a', '#f3e8ce', '#e39731')],
			[animals('Peacock', 'bird', '#287e83', '#3b9c89', '#d2a745', 'spots'), animals('Flamingo', 'bird', '#e77c91', '#f6b0ac', '#e4ad40')],
			[animals('Penguin', 'bird', '#323c48', '#f3eee0', '#e5a33a'), animals('Puffin', 'bird', '#303a45', '#f6eee0', '#ea7139')],
			[animals('Swan', 'bird', '#eee9dc', '#ffffff', '#d79536'), animals('Crane', 'bird', '#d6d0bd', '#eee8d9', '#d24438')]
		]
	},
	{
		name: 'Ocean Life',
		matchups: [
			[animals('Shark', 'sea', '#657e8b', '#b9c6c7', '#364b58', 'dorsal'), animals('Dolphin', 'sea', '#658f9b', '#d4e4df', '#456b76')],
			[animals('Octopus', 'sea', '#bd5a60', '#e79883', '#763d61', 'tentacles'), animals('Squid', 'sea', '#9e5b83', '#e0a0a7', '#634c7f', 'tentacles')],
			[animals('Blue Whale', 'sea', '#527d91', '#b3d0d0', '#385869'), animals('Orca', 'sea', '#252f37', '#f3eee1', '#547d90', 'patch')],
			[animals('Clownfish', 'sea', '#e57836', '#fff0d4', '#292f34', 'stripes'), animals('Pufferfish', 'sea', '#c7a94c', '#e8d77d', '#6b6d42', 'spots')],
			[animals('Crab', 'sea', '#d65342', '#f08b59', '#803b36', 'crab'), animals('Lobster', 'sea', '#bd443a', '#e57e56', '#71373a', 'crab')]
		]
	},
	{
		name: 'Reptiles',
		matchups: [
			[animals('Crocodile', 'reptile', '#66834c', '#9bac5e', '#405638', 'snout'), animals('Alligator', 'reptile', '#687751', '#a9a469', '#414d3b', 'snout')],
			[animals('Turtle', 'reptile', '#528b65', '#b4a55c', '#355940', 'shell'), animals('Tortoise', 'reptile', '#92764a', '#c6a965', '#655137', 'shell')],
			[animals('Gecko', 'reptile', '#70a960', '#b3d57c', '#456b48', 'spots'), animals('Chameleon', 'reptile', '#75a94c', '#d2be5e', '#4d7546', 'spots')],
			[animals('Iguana', 'reptile', '#5f9b61', '#9bc574', '#406948', 'spines'), animals('Komodo Dragon', 'reptile', '#827d66', '#b8aa83', '#5c5849', 'snout')],
			[animals('Monitor Lizard', 'reptile', '#876c4d', '#c0a477', '#594936', 'spots'), animals('Blue-Tongued Skink', 'reptile', '#806a52', '#b6a184', '#4c443e', 'stripes')]
		]
	}
];

const game = {
	board: Array(9).fill(''),
	turn: 'X',
	over: false,
	mode: 'computer',
	categoryIndex: 0,
	matchupIndex: 0,
	winningLine: [],
	scores: { X: 0, O: 0, draw: 0 }
};

const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
document.body.innerHTML = `
	<main class="app">
		<header><div><small>ANIMAL TIC-TAC-TOE</small><h1>Wild <i>Grid</i></h1><p>Pick a pair. Claim the grid.</p></div><button id="theme" aria-label="Toggle light theme">☾</button></header>
		<nav class="controls"><button class="mode active" data-mode="computer">VS COMPUTER</button><button class="mode" data-mode="local">LOCAL DUEL</button><label>Category<select id="category"></select></label><label>Matchup<select id="matchup"></select></label><select id="level" aria-label="Computer difficulty"><option value="easy">Easy</option><option value="hard" selected>Impossible</option></select></nav>
		<section class="scores"><div><span id="xName"></span><b id="sx">0</b></div><div>DRAWS<b id="sd">0</b></div><div><span id="oName"></span><b id="so">0</b></div></section>
		<p id="message" aria-live="polite"></p><div id="board" aria-label="Game board"></div>
		<div class="buttons"><button id="new">NEW GAME</button><button id="undo">UNDO</button></div><footer>Line up three animals to win</footer>
	</main>`;

const css = document.createElement('style');
css.textContent = `
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;background:radial-gradient(circle at top,#282a45,#10111a 65%);color:#f5f5fa;font:14px system-ui}.app{width:min(560px,100%)}header{display:flex;justify-content:space-between;align-items:start;margin-bottom:24px}small{color:#b4bd73;letter-spacing:2px;font-weight:bold}h1{font-size:45px;line-height:1;margin:8px 0}i{color:#b4bd73;font-style:normal}p,footer{color:#a3a4ad}header button,nav button,select,.buttons button{border:1px solid #41434b;background:#1b1d2a;color:#eee;border-radius:7px;padding:10px;cursor:pointer}header button{font-size:20px;width:44px}.controls{display:flex;gap:6px;align-items:end;flex-wrap:wrap;margin-bottom:18px}.controls label{display:grid;gap:5px;color:#b8b9c1;font-size:11px}.controls select{max-width:145px}.controls .active{background:#b4bd73;color:#171916;border-color:#b4bd73}#level{margin-left:auto}.scores{display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;border-block:1px solid #383944;padding:12px}.scores div+div{border-left:1px solid #383944}.scores span{display:block;min-height:17px;color:#c8caaf;font-size:12px}.scores b{display:block;font-size:24px;margin-top:3px}#message{text-align:center;margin:20px 0 12px;min-height:24px}#message b{font-size:17px;color:#d6dc9d}#board{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.cell{aspect-ratio:1;min-width:0;padding:8px;border:1px solid #41434b;border-radius:12px;background:#1b1d29;cursor:pointer;display:grid;place-items:center;overflow:hidden;transition:background .2s,border-color .2s}.cell:hover:not(:disabled){background:#272a37;border-color:#b4bd73}.cell:disabled{cursor:default}.cell.win{background:#393e37;border-color:#c6d28c}.animal{width:100%;height:100%;max-width:132px;max-height:112px;overflow:visible}.animal-motion{transform-box:fill-box;transform-origin:center}.snake-body{fill:none;stroke:var(--animal);stroke-width:19;stroke-linecap:round;stroke-linejoin:round}.snake-hood{fill:var(--detail);stroke:var(--animal);stroke-width:3}.snake-mark{fill:var(--detail);opacity:.9}.mammal-leg{stroke:var(--animal);stroke-width:8;stroke-linecap:round}.bird-leg{stroke:var(--accent);stroke-width:4;stroke-linecap:round}.bird-wing{transform-box:fill-box;transform-origin:75% 50%}.sea-fin{fill:var(--detail);stroke:var(--animal);stroke-width:2}.reptile-leg{fill:var(--animal)}.reptile-shell{fill:var(--detail);stroke:var(--accent);stroke-width:3}.animal-snake .animal-motion{animation:crawl 1.8s ease-in-out infinite}.animal-mammal .animal-motion{animation:walk-bob .7s ease-in-out infinite alternate}.animal-mammal .mammal-leg{transform-box:fill-box;transform-origin:top center;animation:leg-step .7s ease-in-out infinite alternate}.animal-mammal .mammal-leg:nth-of-type(even){animation-delay:-.35s}.animal-bird .bird-wing{animation:wing-flap .55s ease-in-out infinite alternate}.animal-bird .animal-motion{animation:bird-hop 1.4s ease-in-out infinite}.animal-sea .animal-motion{animation:swim 1.5s ease-in-out infinite alternate}.animal-reptile .animal-motion{animation:reptile-prowl 1.3s ease-in-out infinite alternate}.buttons{text-align:center;margin:18px}.buttons button{margin:4px}.buttons #new{background:#b4bd73;color:#171916;border-color:#b4bd73}footer{text-align:center;font-size:12px}@keyframes crawl{0%,100%{transform:translateX(-2px) rotate(-2deg)}50%{transform:translateX(2px) rotate(2deg)}}@keyframes walk-bob{to{transform:translateY(-2px)}}@keyframes leg-step{to{transform:rotate(18deg)}}@keyframes wing-flap{to{transform:rotate(-22deg)}}@keyframes bird-hop{50%{transform:translateY(-3px)}}@keyframes swim{to{transform:translateX(3px) rotate(2deg)}}@keyframes reptile-prowl{to{transform:translateX(2px)}}@media(max-width:480px){body{padding:14px}.controls{align-items:stretch}.controls label{flex:1;min-width:120px}.controls select{max-width:none;width:100%}#level{margin-left:0}.cell{padding:4px;gap:6px}}
body.light{background:linear-gradient(135deg,#e9eaff,#fff);color:#171827}body.light .cell,body.light nav button,body.light select,body.light header button{background:#fff;color:#171827}body.light .scores{border-color:#d0d1d7}body.light .scores div+div{border-color:#d0d1d7}body.light #message,body.light footer{color:#62636b}
`;
document.head.appendChild(css);

const board = document.querySelector('#board');
const message = document.querySelector('#message');
const categorySelect = document.querySelector('#category');
const matchupSelect = document.querySelector('#matchup');
let computerTimer;

function selectedPair() {
	return categories[game.categoryIndex].matchups[game.matchupIndex];
}

function animalSvg(animal) {
	const style = `style="--animal:${animal.color};--detail:${animal.detail};--accent:${animal.accent}"`;
	let drawing = '';
	if (animal.kind === 'snake') {
		const hood = animal.pattern === 'hood' ? '<path class="snake-hood" d="M76 38Q72 10 93 8Q111 14 104 37Z"/>' : '';
		const marks = animal.pattern === 'spots' || animal.pattern === 'bands'
			? [[28, 48], [44, 53], [60, 57], [75, 53]].map(([x, y]) => animal.pattern === 'bands'
				? `<path d="M${x} ${y - 7}q-7 8 0 14" fill="none" stroke="${animal.detail}" stroke-width="5"/>`
				: `<ellipse class="snake-mark" cx="${x}" cy="${y}" rx="4" ry="3"/>`).join('') : '';
		drawing = `<g class="animal-motion">${hood}<path class="snake-body" d="M14 65Q25 37 43 59T70 57Q78 51 87 35"/>${marks}<ellipse cx="94" cy="30" rx="16" ry="12" fill="${animal.color}"/><circle cx="100" cy="27" r="2" fill="#202123"/><path d="M106 32l10 2m-10-1l7 5" stroke="${animal.accent}" stroke-width="2" stroke-linecap="round"/></g>`;
	} else if (animal.kind === 'mammal') {
		const mane = animal.pattern === 'mane' ? `<circle cx="83" cy="35" r="25" fill="${animal.detail}"/><path d="M70 19l5 7m10-12 1 9m11-4-4 9m13 2-8 5m12 8-10 1m2 13-9-6m-7 13-3-10m-12 8 2-10m-13 2 7-8" fill="none" stroke="${animal.accent}" stroke-width="2.5" stroke-linecap="round"/>` : '';
		let marks = '';
		if (animal.pattern === 'stripes') marks = '<path d="M40 41l8 21m7-24 8 27m8-26 8 24" stroke="var(--accent)" stroke-width="4"/>';
		if (animal.pattern === 'spots') marks = '<circle cx="47" cy="48" r="4" fill="var(--accent)"/><circle cx="60" cy="58" r="4" fill="var(--accent)"/><circle cx="70" cy="43" r="4" fill="var(--accent)"/>';
		drawing = `<g class="animal-motion"><path d="M24 48q-12-9-12-1t13 7" fill="none" stroke="${animal.color}" stroke-width="5" stroke-linecap="round"/><path d="M37 59l-3 20m17-19 1 20m17-21 2 20m17-21 4 20" class="mammal-leg" fill="none"/><ellipse cx="62" cy="49" rx="38" ry="23" fill="${animal.color}"/>${marks}${mane}<circle cx="87" cy="34" r="17" fill="${animal.color}"/><circle cx="77" cy="22" r="6" fill="${animal.detail}"/><circle cx="93" cy="31" r="2.5" fill="#202123"/><ellipse cx="101" cy="39" rx="7" ry="5" fill="${animal.accent}"/></g>`;
	} else if (animal.kind === 'bird') {
		const spots = animal.pattern === 'spots' ? '<circle cx="52" cy="46" r="4" fill="var(--accent)"/><circle cx="65" cy="53" r="4" fill="var(--accent)"/><circle cx="57" cy="61" r="4" fill="var(--accent)"/>' : '';
		const stripes = animal.pattern === 'stripes' ? '<path d="M48 40v27m12-30v32m12-27v23" stroke="var(--accent)" stroke-width="5"/>' : '';
		drawing = `<g class="animal-motion"><path d="M38 55L17 45l9 22 15-5" fill="${animal.detail}"/><ellipse cx="59" cy="53" rx="28" ry="22" fill="${animal.color}"/><path class="bird-wing" d="M44 49Q65 30 79 52Q66 66 45 61Z" fill="${animal.detail}"/>${spots}${stripes}<circle cx="83" cy="34" r="15" fill="${animal.color}"/><path d="M95 34l17 6-17 5Z" fill="${animal.accent}"/><circle cx="87" cy="30" r="2" fill="#202123"/><path d="M53 72v11m16-11v11m-16 0-6 3m22-3 6 3" stroke="${animal.accent}" stroke-width="3" stroke-linecap="round"/></g>`;
	} else if (animal.kind === 'sea') {
		if (animal.pattern === 'tentacles') {
			drawing = `<g class="animal-motion"><path d="M46 54q-15 8-15 25m23-21q-5 14-3 23m12-23q5 13 12 19m-4-24q14 8 19 17" fill="none" stroke="${animal.color}" stroke-width="7" stroke-linecap="round"/><ellipse cx="60" cy="43" rx="25" ry="25" fill="${animal.color}"/><circle cx="52" cy="41" r="3" fill="#202123"/><circle cx="68" cy="41" r="3" fill="#202123"/><path d="M53 51q7 6 14 0" fill="none" stroke="${animal.accent}" stroke-width="2"/></g>`;
		} else if (animal.pattern === 'crab') {
			drawing = `<g class="animal-motion"><path d="M43 54l-12 17m19-13-7 18m33-22 12 17m-19-13 7 18M37 47 24 37m59 10 13-10" stroke="${animal.color}" stroke-width="5" stroke-linecap="round"/><ellipse cx="66" cy="52" rx="28" ry="19" fill="${animal.color}"/><path d="M48 43q18-13 36 0" fill="none" stroke="${animal.detail}" stroke-width="6"/><circle cx="58" cy="40" r="2" fill="#202123"/><circle cx="73" cy="40" r="2" fill="#202123"/></g>`;
		} else {
			const marks = animal.pattern === 'stripes' ? '<path d="M49 35v31m14-33v34m14-29v25" stroke="var(--accent)" stroke-width="5"/>' : animal.pattern === 'spots' ? '<circle cx="56" cy="43" r="4" fill="var(--accent)"/><circle cx="70" cy="56" r="4" fill="var(--accent)"/>' : '';
			const dorsal = animal.pattern === 'dorsal' ? '<path class="sea-fin" d="M56 34l10-20 10 22Z"/>' : '';
			drawing = `<g class="animal-motion"><path d="M30 52L12 35v34Z" fill="${animal.detail}"/><path d="M66 66l-7 13 22-10m-4-17 17 7-16 6" fill="${animal.detail}"/><ellipse cx="63" cy="51" rx="36" ry="23" fill="${animal.color}"/>${dorsal}${marks}<circle cx="87" cy="44" r="3" fill="#202123"/></g>`;
		}
	} else {
		const legs = '<path class="reptile-leg" d="M39 55l-12 9 15 3Zm37 0 12 9-15 3Z"/><path class="reptile-leg" d="M46 64l-8 13 15-7Zm24 0 8 13-15-7Z"/>';
		const shell = animal.pattern === 'shell' ? '<ellipse class="reptile-shell" cx="60" cy="48" rx="25" ry="21"/><path d="M60 28v40m-24-20h48m-35-17 23 34m0-34L37 62" fill="none" stroke="var(--accent)" stroke-width="2"/>' : '';
		const snout = animal.pattern === 'snout' ? '<path d="M77 39l34 3-8 13-28-2Z" fill="var(--animal)"/>' : '<ellipse cx="91" cy="41" rx="18" ry="13" fill="var(--animal)"/>';
		const spots = animal.pattern === 'spots' ? '<circle cx="49" cy="43" r="3" fill="var(--accent)"/><circle cx="62" cy="52" r="3" fill="var(--accent)"/><circle cx="72" cy="40" r="3" fill="var(--accent)"/>' : '';
		const spines = animal.pattern === 'spines' ? '<path d="M38 34l5-9 6 9 7-11 5 11 8-10 4 12" fill="var(--accent)"/>' : '';
		drawing = `<g class="animal-motion"><path d="M37 50Q17 61 11 48" fill="none" stroke="${animal.color}" stroke-width="7" stroke-linecap="round"/>${legs}<ellipse cx="59" cy="49" rx="28" ry="19" fill="${animal.color}"/>${shell}${spines}${spots}${snout}<circle cx="98" cy="37" r="2.5" fill="#202123"/></g>`;
	}
	return `<svg class="animal animal-${animal.kind}" ${style} viewBox="0 0 120 96" role="img" aria-label="${animal.name}">${drawing}</svg>`;
}

function announceTurn() {
	const player = game.mode === 'computer' && game.turn === 'O' ? 'Computer' : 'Player';
	message.innerHTML = `${player} turn <b>${selectedPair()[game.turn === 'X' ? 0 : 1].name}</b>`;
}

function render() {
	const pair = selectedPair();
	board.innerHTML = game.board.map((value, index) => {
		const animal = value === 'X' ? pair[0] : value === 'O' ? pair[1] : null;
		return `<button class="cell${game.winningLine.includes(index) ? ' win' : ''}" data-i="${index}" aria-label="${animal ? animal.name + ' in square ' + (index + 1) : 'Empty square ' + (index + 1)}" ${value || game.over ? 'disabled' : ''}>${animal ? animalSvg(animal) : ''}</button>`;
	}).join('');
	document.querySelector('#xName').textContent = pair[0].name;
	document.querySelector('#oName').textContent = pair[1].name;
	document.querySelector('#sx').textContent = game.scores.X;
	document.querySelector('#so').textContent = game.scores.O;
	document.querySelector('#sd').textContent = game.scores.draw;
}

function result() {
	return wins.find(line => game.board[line[0]] && line.every(index => game.board[index] === game.board[line[0]]));
}

function play(index) {
	if (game.over || game.board[index]) return;
	game.board[index] = game.turn;
	const winningLine = result();
	if (winningLine || game.board.every(Boolean)) {
		game.over = true;
		game.winningLine = winningLine || [];
		if (winningLine) {
			game.scores[game.turn]++;
			message.innerHTML = `<b>${selectedPair()[game.turn === 'X' ? 0 : 1].name} wins!</b>`;
		} else {
			game.scores.draw++;
			message.textContent = 'Draw game!';
		}
		render();
		return;
	}
	game.turn = game.turn === 'X' ? 'O' : 'X';
	announceTurn();
	render();
	if (game.mode === 'computer' && game.turn === 'O') computerTimer = setTimeout(computer, 300);
}

function computer() {
	const open = game.board.map((value, index) => value ? -1 : index).filter(index => index >= 0);
	if (!open.length || game.over || game.mode !== 'computer') return;
	let index = open[Math.floor(Math.random() * open.length)];
	if (document.querySelector('#level').value === 'hard') index = open.includes(4) ? 4 : index;
	play(index);
}

function reset() {
	clearTimeout(computerTimer);
	game.board.fill('');
	game.turn = 'X';
	game.over = false;
	game.winningLine = [];
	announceTurn();
	render();
}

categories.forEach((category, index) => categorySelect.add(new Option(category.name, index)));
function populateMatchups() {
	matchupSelect.replaceChildren();
	categories[game.categoryIndex].matchups.forEach((pair, index) => {
		matchupSelect.add(new Option(`${pair[0].name} vs ${pair[1].name}`, index));
	});
	matchupSelect.value = game.matchupIndex;
}
populateMatchups();
categorySelect.value = game.categoryIndex;
board.onclick = event => {
	const cell = event.target.closest('.cell');
	if (cell) play(Number(cell.dataset.i));
};
document.querySelector('#new').onclick = reset;
document.querySelector('#undo').onclick = () => {
	if (game.over) return;
	const last = game.board.lastIndexOf(game.turn === 'X' ? 'O' : 'X');
	if (last > -1) game.board[last] = '';
	game.turn = 'X';
	announceTurn();
	render();
};
categorySelect.onchange = () => {
	game.categoryIndex = Number(categorySelect.value);
	game.matchupIndex = 0;
	populateMatchups();
	reset();
};
matchupSelect.onchange = () => {
	game.matchupIndex = Number(matchupSelect.value);
	reset();
};
document.querySelectorAll('.mode').forEach(button => button.onclick = () => {
	game.mode = button.dataset.mode;
	document.querySelectorAll('.mode').forEach(mode => mode.classList.toggle('active', mode === button));
	reset();
});
document.querySelector('#theme').onclick = () => document.body.classList.toggle('light');
announceTurn();
render();
