var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var game = new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png');
var player = new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png');
var pause = false;

game.img.onload = function(){
    //esta medida so pode ser setada depois da imagem carregada............
    //game.lar = (game.img.width);
    //game.alt = (game.img.height);
    
    //avião posição inicial
    player.flag = 'player';
    player.srcX = 26;
    player.srcY = 17;
    player.lar = 14;
    player.alt = 14;
    player.posX = 115;
    player.posY = 120;
    sprites.push(player);
    //gramado
    //avião posição inicial
    game.flag = 'gramado';
    game.srcX = 84;
    game.srcY = 15;
    game.lar = 30;
    game.alt = 23;
    game.posX = 11;
    game.posY = 12;
    sprites.push(game);
    
   loop();
}
function cenario(){
    
}

function loop(){
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites		
		if (!pause) {/////////////
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