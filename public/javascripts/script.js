var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var gramado = new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png');
var player = new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png');
var pause = false;
var gameOver = false;

player.img.onload = function(){
    //avião posição inicial
    player.flag = 'player';
    player.srcX = 26;
    player.srcY = 17;
    player.lar = 14;
    player.alt = 14;
    player.posX = 115;
    player.posY = 120;
    sprites.push(player);
    loop();
}
gramado.img.onload = function(){
    //esta medida so pode ser setada depois da imagem carregada............
    //gramado.lar = (gramado.img.width);
    //gramado.alt = (gramado.img.height);
    //gramado
    gramado.flag = 'gramado';
    gramado.srcX = 84;
    gramado.srcY = 15;
    gramado.lar = 30;
    gramado.alt = 23;
    gramado.posX = 0;
    gramado.posY = 0;
    sprites.push(gramado);   
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