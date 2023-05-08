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
sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'player', 26, 17, 14, 14, 143, 115));
painel();ponteiro();
sprites[encontrar('player')].img.onload = function(){
    loop();
}
//funcões de renderizar ou desenhar******************************************************************/
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
function menosGrama(id){
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
function maisGrama(id){
    //diagonal fecha esquerda 4/3
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 5, 23, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 20, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 15, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 10, 30*(id-1), -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15,25, 5, 30*(id-1), -23));
    //diagonal abre direita 4/3  posX - lar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 10, 23, cnv.width-30*id+25, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 20, cnv.width-30*id+20, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 20, 15, cnv.width-30*id+15, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 25, 10, cnv.width-30*id+10, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 5, cnv.width-30*id+5, -23));
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
function painel(){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'painel', 74, 66, 78, 15, 111, 134));
}
function ponteiro(nivel){//vazio == 113 posX cheio = 181   tamanho = 68
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'ponteiro', 153, 69, 5, 10, 181, 137));
}
function gas(x) {
    //trabalhando aqui implementar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gas', 152, 14, 15, 25, x, -23));
}
function organizarSprites () {
	//organizar array / pilha de sprites... coloca ponteiro de ultimo e painel de penultimo
	let troca = false;
	do{
		troca = false;			
		for (let i = sprites.length - 2; i >= 0; i--){			
			if (sprites[i].flag == 'painel' && sprites[i+1].flag != 'ponteiro' ) {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;										
			}
            if (sprites[i].flag == 'ponteiro') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;
                console.log(i +' para '+ (i+parseInt(1)));
			}
            /*if (sprites[i].flag == 'gas') {
                troca = sprites[i];
				sprites[i] = sprites[0];
				sprites[0] = troca;
            }*/
		}
        
	}while(troca);
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
        if (sprites[i].posY < -0.5) {
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
            gramado(4);construcao(1, 'e');
            break;
        case 3:
            menosGrama(4);gramado(3);
            break;
        case 4:
            gramado(3);gas(150);
            break;
        case 5:
            gramado(3);organizarSprites();
            break;
        case 6:
            gramado(3)//;maisGrama(4);
            break;
        case 7:
            linha=0;
            break;

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