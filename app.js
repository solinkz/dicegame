/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



let player1 = {
	name: 'player1',
	round: 0,
	global: 0,
	playing: true
}
let player2 = {
	name: 'player2',
	round: 0,
	global: 0,
	playing: false
}


// edit score

let score1 = document.getElementById('score-0');
let score2 = document.getElementById('score-1');

let current1 = document.getElementById('current-0');
let current2 = document.getElementById('current-1');



let startGame = function(){

	score1.innerHTML = 0;
	score2.innerHTML = 0;
	current1.innerHTML = 0;
	current2.innerHTML = 0;

	player1.round=0
	player1.global=0
	player2.round=0
	player2.global = 0;
}

let start = document.querySelector('.btn-new');
start.addEventListener('click', startGame);




// game logic


// roll
function roll(){

	let diceFace = Math.floor(Math.random()*6)+1;
	let diceImg = document.querySelector('.dice');
	diceImg.classList.add('roll')
	setTimeout(()=>{
	diceImg.setAttribute('src',`dice-${diceFace}.png`);
	diceImg.classList.remove('roll')

	},800);
	// console.log(diceFace);

	addScore(diceFace)
}
let roller = document.querySelector('.btn-roll');
roller.addEventListener('click', roll);



// adding score
function addScore(diceFace){
	if(player1.playing){
		if(diceFace == 1){
			player1.round = 0;
			hold(player1);
		}else{
			player1.round += diceFace;
		}

	}else if(player2.playing){
		if(diceFace == 1){
			player2.round = 0;
			hold(player2);
		}else{
			player2.round += diceFace;
		}
	}else{
		console.log('error')
	}

	updateScore('current');
}


// updatescore
function updateScore(scoretype){
	if(scoretype == 'current'){
		current1.innerHTML = player1.round;
		current2.innerHTML = player2.round;
	}else if(scoretype == 'global'){
		score1.innerHTML = player1.global
		score2.innerHTML = player2.global
	}
}



// hold round


function hold(player){

	player1.playing = !player1.playing;
	player2.playing = !player2.playing;

	addRemoveActive();


	player.global += player.round
	player.round = 0
	// player1.global += player1.round;
	// player1.current = 0;
	// player2.global += player2.round
	// player2.current = 0

	updateScore('global');

	if(player.global >= 100){
		gameOver(player);
	}
	
}

let holder = document.querySelector('.btn-hold');
holder.addEventListener('click', ()=>{
	if(player1.playing){
		hold(player1);
	}else if(player2.playing){
		hold(player2);
	}else{
		console.log('error');
	}
});


function addRemoveActive(){
	if(player1.playing){
		document.querySelector('.player-0-panel').classList.add('active')
	}else{
		document.querySelector('.player-0-panel').classList.remove('active')

	}

	if(player2.playing){
		document.querySelector('.player-1-panel').classList.add('active')
	}else{
		document.querySelector('.player-1-panel').classList.remove('active')

	}
}



// gameover

function gameOver(player){
	updateScore('global');

	setTimeout(()=>{
		document.querySelector('.player-name').innerHTML = player.name;
		document.querySelector('.winner').style.display = "flex";
		// alert(player.name + ' has won the game');
		startGame();
		
	},1400);
	
}

document.querySelector('.close-winner').addEventListener('click', ()=>{
	document.querySelector('.winner').style.display = "none";
	startGame();
})