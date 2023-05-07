var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var pause = true;
var gameOver = false;
/*ANOTAÇÕES...
cnv.width = 300;
cnv.heigth = 150;
*/
//avião player
sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'player', 26, 17, 14, 14, 143, 120));

cenario();

sprites[encontrar('player')].img.onload = function(){
    loop();
}

function cenario(){
    gramado(3);
    aumenta(4);    
}
function gramado(id){
    for (let i = 0; i < id; i++) {
        //esquera
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, i*30, -23));
        //direita
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, 270-i*30, -23));
    }
}
function estrada(id){
    for (let i = 0; i < id; i++) {
        //estrada esquerda
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 16, 25, i*30, -25));
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 16, 25, 16+i*30, -25));
        //estrada direita
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 16, 25, 284-i*30, -25));
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 16, 25, 284-16-i*30, -25));
    }
}
function ponte(){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'ponte', 172, 15, 60, 23, 120, -24));
}
function maisGrama(id){//aumenta o rio diminuindo laterais de gramado de 4 para 3 em cada linha lateral
    //diagonal abre esquerda 4/3
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 23, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 21, 30*(id-1), -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 19, 30*(id-1), -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 17, 30*(id-1), -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 15, 30*(id-1), -15));
    //diagonal abre direita 4/3  posX - lar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 23, cnv.width-30*id+20, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 21, cnv.width-30*id+15, -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 19, cnv.width-30*id+10, -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 17, cnv.width-30*id+5, -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 15, cnv.width-30*id, -15));
    console.log(cnv.width-30*id+20);
}
function menosGrama(id){//diminui o rio aumentando laterais de gramado de 4 para 3 em cada linha lateral
    //diagonal fecha esquerda 4/3
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 15, 30*(id-1), -15));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 13, 30*(id-1), -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 11, 30*(id-1), -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 9, 30*(id-1), -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 7, 30*(id-1), -23));
    //diagonal abre direita 4/3  posX - lar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 15, cnv.width-30*id+20, -15));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 13, cnv.width-30*id+15, -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 11, cnv.width-30*id+10, -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 9, cnv.width-30*id+5, -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 7, cnv.width-30*id, -23));
}
//auxiliar rio copia do mais/menos-Grama
function menosRio(id){//aumenta o rio diminuindo laterais de gramado de 4 para 3 em cada linha lateral
    //diagonal abre esquerda 4/3
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 23, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 21, 30*(id-1), -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 19, 30*(id-1), -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 17, 30*(id-1), -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 15, 30*(id-1), -15));
    //diagonal abre direita 4/3  posX - lar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 23, cnv.width-30*id+20, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 21, cnv.width-30*id+15, -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 19, cnv.width-30*id+10, -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 17, cnv.width-30*id+5, -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 15, cnv.width-30*id, -15));
    console.log(cnv.width-30*id+20);
}
function maisRio(id){//diminui o rio aumentando laterais de gramado de 4 para 3 em cada linha lateral
    //diagonal fecha esquerda 4/3
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 15, 30*(id-1), -15));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 13, 30*(id-1), -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 11, 30*(id-1), -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 9, 30*(id-1), -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 7, 30*(id-1), -23));
    //diagonal abre direita 4/3  posX - lar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 15, cnv.width-30*id+20, -15));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 13, cnv.width-30*id+15, -17));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 11, cnv.width-30*id+10, -19));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 9, cnv.width-30*id+5, -21));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 7, cnv.width-30*id, -23));
}

function loop(){
    let imprimir = true;
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites

		if (!pause && !gameOver) {/////////////
			sprites[i].exe();/////////////////
		}////////////////////////////////////
		sprites[i].desenha();///////////////
        /*verificar se existe algo acima da tela de jogo*/
        if (sprites[i].posY < 0) {
            imprimir = false;
        }
	}
    if (imprimir) {
        pause = true;
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