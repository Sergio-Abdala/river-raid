var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var pause = false;
var gameOver = false;
var linha = 0;
/*ANOTAÇÕES...
cnv.width = 300;
cnv.heigth = 150;
*/
//avião player
sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'player', 26, 17, 14, 14, 143, 120));

sprites[encontrar('player')].img.onload = function(){
    loop();
}
//funcões de imprimir ou desenhar******************************************************************/
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
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 15, 23, i*30, -23));
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 15, 23, 15+i*30, -23));
        //estrada direita
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 15, 23, 285-i*30, -23));
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'estrada', 67, 15, 15, 23, 285-15-i*30, -23));
    }
}
function ponte(){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'ponte', 172, 15, 60, 23, 120, -24));
}
function menosGrama(id){//aumenta o rio diminuindo laterais de gramado de 4 para 3 em cada linha lateral
    //diagonal abre esquerda 4/3
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 5, 23, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 20, 30*(id-1), -20));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 15, 30*(id-1), -15));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 10, 30*(id-1), -10));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 5, 30*(id-1), -5));
    //diagonal abre direita 4/3  posX - lar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 5, 23, cnv.width-30*id+25, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 20, cnv.width-30*id+20, -20));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 15, cnv.width-30*id+15, -15));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 10, cnv.width-30*id+10, -10));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 5, cnv.width-30*id+5, -5));
    console.log(cnv.width-30*id+20);
}
function maisGrama(id){//diminui o rio aumentando laterais de gramado de 4 para 3 em cada linha lateral
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
function maisRio(id){
    menosGrama(id);
}
function menosRio(id){
    maisGrama(id);
}
function construcao(lin, lad){
    //esquera
    if (lad == 'e') {
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 117, 15, 30, 23, lin*30, -23));
    }    
    //direita
    if (lad == 'd') {
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 117, 15, 30, 23, 270-lin*30, -23));
    }    
}
//************************************************************************************************ */
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
        //pause = true;
        fase01();
    }
	requestAnimationFrame(loop, "canvas");
}
function fase01(){
    switch (linha) {
        case 0:
            gramado(4);
            break;
        case 1:
            estrada(4);
            break;
        case 2:
            gramado(4);
            break;
        case 3:
            menosGrama(4);gramado(3);
            break;
        case 4:
            gramado(3);
            break;
        case 5:
            gramado(3);
            break;
        case 6:
            gramado(3);construcao(1, 'd');
            break;
        /*case 7:
            gramado(3);
            break;*/

        default:
            pause = true;
            break;
    }
    linha++;
}
function encontrar(flag){//descobre index do objeto que corresponda a flag...
	//descobre qual obj do array tem a flag correspondente, avaliar para flag's identicas???
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			return i;
		}
	}
}