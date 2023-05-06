var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var pause = true;
var gameOver = false;

//avião player
sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'player', 26, 17, 14, 14, 115, 120));
//gramado
sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, 0, 0));

sprites[encontrar('player')].img.onload = function(){
    loop();
}

function cenario(){
    
}

function loop(){
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites		
		if (!pause && !gameOver) {/////////////
			sprites[i].exe();///
		}/////////////////////////
		sprites[i].desenha();/////					
	}
	requestAnimationFrame(loop, "canvas");
}
function encontrar(flag){//descobre index do objeto que corresponda a flag...
	//descobre qual obj do array tem a flag correspondente, avaliar para flag's identicas???
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			return i;
		}
	}
}