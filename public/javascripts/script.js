var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var game = new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png');

game.img.onload = function(){
    //esta medida so pode ser setada depois da imagem carregada............
    //game.lar = (game.img.width);
    //game.alt = (game.img.height);
    
    //avião
    game.flag = 'player';
    game.srcX = 26;
    game.srcY = 17;
    game.lar = 14;
    game.alt = 14;
    game.posX = 115;
    game.posY = 120;
    sprites.push(game);
    /*/avião-direito
    game.srcX = 13;
    game.srcY = 18;
    game.lar = 10;
    game.alt = 14;
    game.posX = 100;
    game.posY = 120;
    game.desenha();
    //avião-esquerdo
    game.srcX = 43;
    game.srcY = 18;
    game.lar = 10;
    game.alt = 14;
    game.posX = 133;
    game.posY = 120;
    game.desenha();
    */
   loop();
}

function loop(){
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites		
		//if (!pause) {/////////////
			sprites[i].exe();///
		//}/////////////////////////
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