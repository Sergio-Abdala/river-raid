var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();
var pause = false;
var gameOver = false;
var contador = {
    linha: 63,
    tiro: 0,
    atingiu: Array(),
    hodometro: -150,
    vida: 3,
    pontos: 0,
    fiMeio: 0
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
function grama(){
    //esquera
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 3, 23, 0, -23));
    //direita
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 3, 23, cnv.width-3, -23));
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
function maisRio(id){//auxiliar rio copia do mais/menos-Grama
    menosGrama(id);
}
function menosRio(id){
    maisGrama(id);
}
//
function meioIn(id){//baixar 13 posy += 13;
    let baixar = 13 * id;
    let altura;// = 13 * id;
    //(id) ? baixar=13 : baixar=0;
    (id) ? altura=13 : altura = 0;
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 2, cnv.width/2-15-15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 24, 4, cnv.width/2-12-15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 18, 6, cnv.width/2-9-15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 12, 8, cnv.width/2-6-15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 6, 10, cnv.width/2-3-15*id, -10+baixar));
    //
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 2, cnv.width/2-15+15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 24, 4, cnv.width/2-12+15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 18, 6, cnv.width/2-9+15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 12, 8, cnv.width/2-6+15*id, -10+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 6, 10, cnv.width/2-3+15*id, -10+baixar));
    //
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 13+altura, cnv.width/2-15-15*id, -23));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 13+altura, cnv.width/2-15+15*id, -23));
    if (id > 1) {
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 13, cnv.width/2-15-15*id, -23+altura*id));
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 13, cnv.width/2-15+15*id, -23+altura*id));
    }
}
function meio(id){
    switch (id) {
        case 1:
            sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, cnv.width/2-15, -23));
            break;
        case 2:
            sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, cnv.width/2-30, -23));        
            sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, cnv.width/2, -23));
            break;

        default:
            for (let i = 2; i < id; i++) {
                sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, cnv.width/2-30*i, -23));        
                sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, cnv.width/2+30*(i-1), -23));
                
            }
            sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 23, cnv.width/2-15, -23));
            break;
    }    
}
function meioFim(id){//gramado.lar=30 .alt=23 baixa 13 conforme camada sucessiva 
    let baixar = 13*contador.fiMeio;// (id) ?  : ;
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 2, cnv.width/2-15-15*id, -2+baixar));//
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 24, 4, cnv.width/2-12-15*id, -4+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 18, 6, cnv.width/2-9-15*id, -6+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 12, 8, cnv.width/2-6-15*id, -8+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 6, 10, cnv.width/2-3-15*id, -10+baixar));
    //direito
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 2, cnv.width/2+15*id, -2+baixar));//
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 12, 4, cnv.width/2+15*id, -4+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 9, 6, cnv.width/2+15*id, -6+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 6, 8, cnv.width/2+15*id, -8+baixar));
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 3, 10, cnv.width/2+15*id, -10+baixar));
    if (id) {
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 30, 13, cnv.width/2-15*id, -13+baixar));
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'gramado', 84, 15, 15, 13, cnv.width/2, -13+baixar));
    }
    contador.fiMeio++;
}
//
function construcao(lin, lad){
    //esquera
    if (lad == 'e') {
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'construcao', 117, 15, 30, 23, lin*30, -23));
    }    
    //direita
    if (lad == 'd') {
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid.png', 'construcao', 117, 15, 30, 23, 270-lin*30, -23));
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
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'navio', 3, 57, 33, 9, x, -14));
    //console.log('add navio');
}
function helicoptero(direcao, x, y){
    if(direcao == 'd'){
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'helicoptero', 2, 45, 17, 11, x, y));
        sprites[encontrar('helicoptero')].movRight = true;
        sprites[encontrar('helicoptero')].speed = 1;
    }else if(direcao == 'e'){//direção esq
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'helicoptero', 2, 34, 17, 11, x, y));
        sprites[encontrar('helicoptero')].movLeft = true;
        sprites[encontrar('helicoptero')].speed = 1;
    }else{//parado
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'helicoptero', 2, 45, 17, 11, x, y));
    }
}
function aviao(direcao){
    if(direcao == 'd'){
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'aviao', 39, 40, 17, 7, 0, -17));
        sprites[encontrar('aviao')].movRight = true;
        sprites[encontrar('aviao')].speed = 2;
    }else{//direção esq
        sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'aviao', 39, 48, 17, 7, cnv.width, -14));
        sprites[encontrar('aviao')].movLeft = true;
        sprites[encontrar('aviao')].speed = 1;
    }    
    //baixarGramado();
}
function explosao(X, Y){
    sprites.push(new Sprite('images/Atari - River Raid Atari 2600 - River Raid-transparente.png', 'explosao', 6, 98, 13, 9, X, Y));
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
    baixarGramado();   
    if (contador.hodometro == 0) {//condição de start...
        pause = true;
        sprites[encontrar('ponteiro')].posX = 181;
    }
    if (!pause && !gameOver) {
        contador.hodometro += sprites[encontrar('player')].speed;
        let km = contador.hodometro/100;
        //console.log('km: '+km.toFixed(1));//.toFixed(1)
    }
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites

		if (!pause && !gameOver) {/////////////
			sprites[i].exe();/////////////////  movimento do jogo...            
		}////////////////////////////////////
		sprites[i].desenha();/////////////// renderiza na tela...

        /*verificar se existe algo acima da tela de jogo para saber quando renderizar nova linha*/
        if (sprites[i].posY < 0 && sprites[i].flag == 'gramado') {
            imprimir = false;
        }
	}
    //for secundario para remover obj depois de renderizar todos os elementos na tela
    for (let k = 0 ; k < sprites.length; k++) {//percorre array de sprites
        //eliminar do array
        if (sprites[k].posY > cnv.height+3 || sprites[k].posY < -23 || sprites[k].posX > cnv.width+33 || sprites[k].posX < -33 || sprites[k].flag == 'remover') {
            sprites.splice(k, 1);
        }
    }
    if (imprimir) {
        //pause = true;
        fase01();
    }
	requestAnimationFrame(loop, "canvas");
}
function encontrar(flag){//descobre index do objeto que corresponda a flag com maior index do array
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			return i;
		}
	}
    return false;
}
function contar(obj){//descobre quantos tiros tem em jogo
    let countObj = 0;
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == obj) {
			countObj++
		}
	}
    return countObj;
}
function baixarGramado(){
    for (let i = 1; i < sprites.length; i++) {
        if (sprites[i-1].flag != 'gramado' && sprites[i].flag == 'gramado') {
            troca = sprites[i];
            sprites[i] = sprites[i-1];
            sprites[i-1] = troca;
            i=1;
        }
        
    }
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
            gramado(4);
            break;
        case 3:
            gramado(4);construcao(1, 'e');
            break;
        case 4:
            gramado(3);maisRio(4);
            break;
        case 5:
            gramado(3);navio(130);
            break;
        case 6:
            gramado(3);gas(171);
            break;
        case 7:
            gramado(3);helicoptero('p', 110, -23);
            break;
        case 8:
            gramado(3);//meioIn(0);
            break;
        case 9:
            gramado(3);gas(151);//meio();meioIn(1);        //ate aqui ok
            break;
        case 10:
            gramado(3);//meio(2);meioIn(2);      // ate aqui ok
            break;
        case 11:
            gramado(3);gas(185);//maisGrama(4);//meio(1);meioFim(2);
            break;
        case 12:
            gramado(3);construcao(1, 'd');//meioFim(1);
            break;
        case 13:
            gramado(3);construcao(1, 'e');//meioFim(0);menosGrama(4);      //ok
            break;
        case 14:
            gramado(3);construcao(1, 'd');//gas(151);
            break;
        case 15:
            gramado(3);gas('171');//navio(cnv.width/2 +15);                  //ok
            break;
        case 16:
            gramado(3)//;maisGrama(4);
            break;
        case 17:
            gramado(3);helicoptero('p', 110, -10);
            break;
        case 18:
            gramado(3);gas(121);
            break;
        case 19:
            gramado(3);helicoptero('p', 140, -10);                      //ok
            break;
        case 20:
            gramado(3);gas('180');//aviao('e');aviao('d');              ok
            break;
        case 21:
            gramado(3);//maisGrama(4);
            break;
        case 22:
            gramado(3);navio(170);
            break;
        case 23:
            gramado(3);helicoptero('p', 170, -12);
            break;
        case 24:
            gramado(3);
            break;
        case 25:
            gramado(3);navio(120);
            break;
        case 26:
            gramado(3);gas(140);
            break;
        case 27:
            gramado(3);
            break;
        case 28:
            gramado(3);helicoptero('p', 180, -15);
            break;
        case 29:
            gramado(3);construcao(1, 'd');
            break;
        case 30:
            gramado(3);construcao(1, 'e');
            break;
        case 31:
            gramado(3);construcao(1, 'd');
            break;
        case 32:
            gramado(3);helicoptero('p', 180, -15);
            break;
        case 33:
            gramado(3);construcao(1, 'd');
            break;//https://www.youtube.com/watch?v=pmPjsBDN9Xw&t=25s
        case 34:
            gramado(3);navio(170);
            break;//https://www.youtube.com/watch?v=pmPjsBDN9Xw&t=26s
        case 35:
            gramado(3);
            break;
        case 36:
            gramado(3);helicoptero('p', 180, -15);
            break;
        case 37:
            gramado(3);construcao(2, 'd');
            break;
        case 38:
            gramado(3);gas(170);
            break;
        case 39:
            gramado(3);helicoptero('p', 120, -15);
            break;//https://www.youtube.com/watch?v=pmPjsBDN9Xw&t=27s
        case 40:
            gramado(3);menosRio(4);
            break;
        case 41:
            gramado(4);navio(135);
            break;
        case 42:
            estrada(4);ponte();
            break;
        case 43:
            gramado(4);
            break;
        case 44:
            gramado(4);construcao(1, 'd');//https://www.youtube.com/watch?v=pmPjsBDN9Xw&t=28s
            break;
        case 45:
            gramado(3);maisRio(4);
            break;
        case 46:
            gramado(3);navio(161);
            break;
        case 47:
            gramado(3);
            break;
        case 48:
            gramado(3);construcao(1, 'd');
            break;
        case 49:
            gramado(2);maisRio(3);
            break;
        case 50:
            gramado(2);navio(171);
            break;
        case 51:
            gramado(2);menosRio(3);
            break;
        case 52:
            gramado(3);helicoptero('e', 161, -12);sprites[encontrar('helicoptero')].speed = .5;
            break;
        case 53:
            gramado(3);gas(181);
            break;//https://www.youtube.com/watch?v=pmPjsBDN9Xw&t=32s
        case 54:
            gramado(3);helicoptero('p', 100, -23);
            break;
        case 55:
            gramado(2);maisRio(3);
            break;
        case 56:
            gramado(1);maisRio(2);
            break;
        case 57:
            gramado(1);construcao(0, 'e');
            break;
        case 58:
            gramado(1);gas(240);
            break;
        case 59:
            maisRio(1);//trabalhar deslocamento meio gramado
            break;
        case 60:
            grama();helicoptero('p', 6, -13);//trabalhar deslocamento meio gramado
            break;
        case 61:
            grama();meioIn(0);
            break;
        case 62:
            grama();meioIn(1);gas(90);
            break;
        case 63:
            grama();meio(2);navio(70);
            break;
        case 64:
            grama();meio(2);navio(190);
            break;//https://www.youtube.com/watch?v=pmPjsBDN9Xw&t=37s
        case 65:
            grama();meioFim(1);//contador.fiMeio++;
            break;
        case 66:
            grama();meioFim(0);
            break;
        default:
            //estrada(2)//;ponte();
            //contador.linha = -1;
            pause = true;
            break;
    }
    contador.linha++;
}