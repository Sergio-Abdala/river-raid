var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var pause = false;
var gameOver = false;
var contador = {
    linha: 0,
    tiro: 0,
    atingiu: Array()
}
//var linha = 0;
/*ANOTAÇÕES...
cnv.width = 300;
cnv.heigth = 150;
*/
//avião player
sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'player', 26, 17, 14, 14, 143, 115));
painel();ponteiro();
sprites[encontrar('player')].img.onload = function(){
    loop();
}
//funcões de renderizar ou desenhar******************************************************************/
//elementos do cenario
function gramado(id){
    for (let i = 0; i < id; i++) {
        //esquera
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, i*30, -23));
        //direita
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, 270-i*30, -23));
    }
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
function painel(){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'painel', 74, 66, 78, 15, 111, 134));
}
function ponteiro(nivel){//vazio == 113 posX cheio = 181   tamanho = 68
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'ponteiro', 153, 69, 5, 10, 181, 137));
}
function tiro(){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'tiro', 6, 21, 2, 8, sprites[encontrar('player')].meiox()-1, sprites[encontrar('player')].posY));
    contador.tiro++;    
}
//objetos npc / elementos do jogo...
function gas(x) {
    //trabalhando aqui implementar
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gas', 152, 14, 16, 26, x, -23));
}
function ponte(){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'ponte', 172, 15, 60, 23, 120, -24));
}
function navio(x){
    //<---3  --->36 soma a largura no srcX para virar de lado...
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'navio', 3, 57, 33, 9, x, -14));
    //console.log('add navio');
}

function organizarSprites () {
	//organizar array / pilha de sprites... coloca ponteiro de ultimo e painel de penultimo
    for (let i = sprites.length - 2; i >= 0; i--){
        let troca = false;
        if (sprites[i].flag == 'ponteiro' && i < sprites.length-1) {//ultimo elemento do array
            troca = sprites[i];
            sprites[i] = sprites[sprites.length-1];
            sprites[sprites.length-1] = troca;
            troca = true;
        }
        if (sprites[i].flag == 'painel' && i < sprites.length-2) {//penultimo elemento do array
            troca = sprites[i];
            sprites[i] = sprites[sprites.length-2];
            sprites[sprites.length-2] = troca;
            troca = true;
        }
        if (sprites[i].flag == 'player' && i < sprites.length-3) {//antepenultimo elemento do array
            troca = sprites[i];
            sprites[i] = sprites[sprites.length-3];
            sprites[sprites.length-3] = troca;
            troca = true;
        }
    }	
}
//************************************************************************************************ */
function loop(){
    let imprimir = true;
    organizarSprites();
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites

		if (!pause && !gameOver) {/////////////
			sprites[i].exe();/////////////////  movimento do jogo...
		}////////////////////////////////////
		sprites[i].desenha();/////////////// renderiza na tela...

        /*verificar se existe algo acima da tela de jogo para saber quando renderizar nova linha*/
        if (sprites[i].posY < -0.5) {
            imprimir = false;
        }
        //eliminar do array
        if (sprites[i].posY > cnv.height+23 || sprites[i].posY < -23 || sprites[i].flag == 'remover') {
            
            sprites.splice(i, 1);
        }        
	}
    if (imprimir) {
        //pause = true;
        fase01();
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
    return false;
}
function fase01(){
    switch (contador.linha) {
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
            gramado(3);navio(cnv.width/2 +15);
            break;
        case 6:
            gramado(3)//;maisGrama(4);
            break;
        case 7:
            gramado(3);maisGrama(4);
            break;

        default:
            gramado(4);
            contador.linha = 0;
            break;
    }
    contador.linha++;
}