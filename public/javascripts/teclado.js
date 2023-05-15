//VARIAVEIS GLOBAIS...
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var porcentMouseX = porcentMouseY = null;

window.addEventListener("keydown", keydownHandler, false);
window.addEventListener("keyup", keyupHandler, false);
//
function keydownHandler(e){	
	switch(e.keyCode){
		case RIGHT:
			sprites[encontrar('player')].movRight = true;
			sprites[encontrar('player')].movLeft = false;
			//sprites[encontrar('player')].movUp = false;
			//sprites[encontrar('player')].movDown = false;
		break;
		case LEFT:
			sprites[encontrar('player')].movRight = false;
			sprites[encontrar('player')].movLeft = true;
			//sprites[encontrar('player')].movUp = false;
			//sprites[encontrar('player')].movDown = false;
		break;
		case UP:
			//sprites[1].movRight = false;
			//sprites[1].movLeft = false;
			sprites[encontrar('player')].movUp = true;
			sprites[encontrar('player')].movDown = false;
		break;
		case DOWN:
			//sprites[1].movRight = false;
			//sprites[1].movLeft = false;
			sprites[encontrar('player')].movUp = false;
			sprites[encontrar('player')].movDown = true;
		break;
	}
}
function keyupHandler(e){
	//console.log(e.keyCode);
	switch(e.keyCode){
		case RIGHT:
			sprites[encontrar('player')].movRight = false;
			pause = false;
			GLOBAIS.hodometro = 1;
		break;
		case LEFT:
			sprites[encontrar('player')].movLeft = false;
			pause = false;
			GLOBAIS.hodometro = 1;
		break;
		case UP:
			sprites[encontrar('player')].movUp = false;
			pause = false;
			GLOBAIS.hodometro = 1;
		break;
		case DOWN:
			sprites[encontrar('player')].movDown = false;
			pause = false;
			GLOBAIS.hodometro = 1;
		break;
		case 32: //barra de espaço
			tiro();
			pause = false;
			GLOBAIS.hodometro = 1;
		break;
		case 33://pag up
			
		break;
		case 34://pag down
						
		break;
		case 48: // 0 numero...
			window.open("/help");
		break;
		case 49: // 1 numero...			
			
		break;
		case 50: // 2 numero...			
			
		break;
		case 51: // 3 numero...
			
		break;
		case 52: // 4 numero...
			
		break;
		case 53: // 5 numero...
			
		break;
		case 54: // 6 numero...
			
		break;
		case 55: // 7 numero...
			
		break;
		case 56: // 8 numero...
			
		break;
		case 57: // 9 numero...
			console.log('numero 9 <==> teclado...' );
		break;
		case 72: // h letra...
			console.log('letra h <==> teclado...' );
			window.open("/help");
		break;
		case 77: // m letra...
			console.log('letra m <==> teclado...');				
		break;
		case 80: // p letra...
			console.log('letra p <==> teclado...');
			if (pause) {
				pause = false;
			}else{
				pause = true;
			}
		break;
	}
}

cnv.addEventListener('click', event =>   //mouse
{
    let rect = cnv.getBoundingClientRect();
    //rect é a tela do canvas
    let x = event.clientX;// - rect.left;// - cnv.clientLeft;
    let y = event.clientY;// - rect.top;// - cnv.clientTop;

    //console.log(x +' , '+ y +' tamanho da tela? ' + rect.width +' , '+ rect.height);
     porcentMouseX = x / rect.width;
     porcentMouseY = y / rect.height;          

});