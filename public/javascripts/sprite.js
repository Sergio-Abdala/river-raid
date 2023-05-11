function Sprite(imgSrc, flag, srcX, srcY, lar, alt, posX, posY){
	//atributos.............................
		this.img = new Image();
		this.img.src = imgSrc;
        this.srcX = srcX;
		this.srcY = srcY;
        this.lar = lar;
		this.alt = alt;
		this.escala = 1;
        this.posX = posX;
		this.posY = posY;
        this.movRight = false;
		this.movLeft = false;
		this.movUp = false;
		this.movDown = false;
		this.speed = 1;
        this.flag = flag;
    //metodos..............................
    this.desenha = function(){
        //if (this.exibir) {
            ctx.drawImage(this.img, this.srcX, this.srcY, this.lar, this.alt, this.posX, this.posY, this.lar, this.alt);
        //}		
    }
    this.exe = function(){
        //movimento 
        if(this.movRight){
            this.posX += this.speed;
            if (this.flag == 'player') {
                //posição direita do avião
                this.srcX = 13;
                this.srcY = 18;
                this.lar = 10;
                this.alt = 14;
            }
			if (this.flag == 'navio') {
                //posição direita
                this.srcX = 36;
            }
        }else if(this.movLeft){
            this.posX -= this.speed;
            if (this.flag == 'player') {
                //posição esquerda do avião
                this.srcX = 43;
                this.srcY = 18;
                this.lar = 10;
                this.alt = 14;
            }
			if (this.flag == 'navio') {
                //posição esquerda
                this.srcX = 3;
            }
        }else{
            if (this.flag == 'player') {
                //posição inicial avião
                this.srcX = 26;
                this.srcY = 17;
                this.lar = 14;
                this.alt = 14;
            }
        }
        if (this.movUp) {
            this.speed = 1.5;
        }else if(this.movDown){
            this.speed = .5;
        }else{
            this.speed = 1;
        }
        //movimento vertical
        if (this.flag != 'player' && this.flag != 'painel' && this.flag != 'ponteiro' && this.flag != 'tiro') {//ñ é o player todos os demais elementos...
            this.posY += sprites[encontrar('player')].speed;			
        }
		
		if (this.flag == 'tiro'){//movimenta ou remove
			if (this.posY > 0) {
				this.posY -= 3;
			}else{
				this.flag = 'remover';
			}			
		}
        //colisão com player
        if (this.flag != 'player' && this.flag != 'tiro' && this.flag != 'explosao' && this.flag != 'remover' && colide(this, sprites[encontrar('player')])) {
			if (this.flag == 'gas') {//enche tanque				
				if (sprites[encontrar('ponteiro')].posX < 181) {//enchendo tanque
					sprites[encontrar('ponteiro')].posX+=.5;
				}				
			}else{
				//player explode...
				sprites[encontrar('player')].srcX = 8;
				sprites[encontrar('player')].srcY = 77;
				sprites[encontrar('player')].lar = 15;
				sprites[encontrar('player')].alt = 12;
				gameOver = true;
			}
        }
		//colisão com tiro
		if (contar('tiro')){			
			for (let j = 0; j < sprites.length; j++) {
				if (sprites[j].flag == 'tiro') {
					if (sprites[j].posY < 0) {
						sprites[j].flag = 'remover';
					}
					if (this.flag != 'tiro' && this.flag != 'player' && colide(this, sprites[j])) {
						//identificar oq colidiu com tiro
						console.log('tiro atingiu '+ this.flag);
						contador.atingiu.push(this.flag);
						//remover tiro
						if(this.flag != 'explosao'){
							console.log('remover '+ sprites[j].flag);
							sprites[j].flag = 'remover';
						}
						switch (this.flag) {
							case 'gas':
									this.srcX = 4;
									this.srcY = 110;
									this.flag = 'explosao';							
								break;
							case 'ponte':
									this.srcX = 25;
									this.srcY = 110;
									this.lar = 35;
									this.posX += 13;
									this.flag = 'explosao';							
								break;
							case 'navio':
									this.srcX = 25;
									this.srcY = 110;
									this.lar = 35;
									this.posX += 1;
									this.movRight = false;
									this.movLeft = false;
									this.flag = 'explosao';							
								break;
							case 'aviao':
									this.srcX = 4;
									this.srcY = 110;
									this.lar = 17;
									this.alt = 13;
									this.posX += 1;
									this.movRight = false;
									this.movLeft = false;
									this.flag = 'explosao';
								break;
							case 'helicoptero':
								this.srcX = 4;
								this.srcY = 110;
								this.lar = 17;
								this.alt = 13;
								this.posX += 1;
								this.movRight = false;
								this.movLeft = false;
								this.flag = 'explosao';
								//
								break;
							default:
								break;
						}								
					}
				}
			}
		}
		//ponteiro
		if (this.flag == 'ponteiro') {
			if (sprites[encontrar('player')].speed < 1) {
				this.posX-=.05;
			}
			if (sprites[encontrar('player')].speed > 1) {
				this.posX-=.15;
			}
			if (sprites[encontrar('player')].speed == 1) {
				this.posX-=.1;
			}			
			if (this.posX < 113) {//player explode...
				sprites[encontrar('player')].srcX = 8;
				sprites[encontrar('player')].srcY = 77;
				sprites[encontrar('player')].lar = 15;
				sprites[encontrar('player')].alt = 12;
				//
				gameOver = true;
			}
		}
		if (this.flag != 'gramado') {//varrer array procurando colisões com gramado
			for (let j = 0; j < sprites.length; j++) {
				if (sprites[j].flag == 'gramado') {
					if (colide(this, sprites[j])) {
						//colidiu com gramado
						if (this.flag == 'navio' || this.flag == 'helicoptero') {
							if (this.movRight) {
								this.movRight = false;
								this.movLeft = true;
							}else{
								this.movRight = true;
								this.movLeft = false;
							}
						}
					}
				}				
			}			
		}
    }
}
Sprite.prototype.metax = function(){
	return (this.lar) / 2;
}
Sprite.prototype.metay = function(){
	return (this.alt) / 2;
}
Sprite.prototype.meiox = function(){
	return this.posX + this.metax();
}
Sprite.prototype.meioy = function(){
	return this.posY + this.metay();
}
function bloqueando(p1, p2){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.posY += overlapy;
				//
				console.log('bateu cabeça: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('entrou '+ p2.txt);
					//aqui muda de fase....					
					sprites[encontrar('player')].fase = p2.txt;					
				}
			} else {
				p1.posY -= overlapy;
				//
				console.log('esta pisando: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('saiu '+ p2.txt);
					//aqui muda de fase....					
					sprites[encontrar('player')].fase = p2.txt;					
				}
			}
		} else { // colisão pelos lados esquerda ou direita
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if(catx > 0){ // colidiu na esquerda
				p1.posX += overlapx;
				//
				console.log('player bateu à esquerda: '+ p2.id);
			}else{
				p1.posX -= overlapx;
				//
				console.log('player bateu à direita: '+ p2.id);
			}
		}
	}
}
function empurando(p2, p1){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.worldY += overlapy; 
			} else {
				p1.worldY -= overlapy;
			}
		} else { // colisão pelos lados esquerda ou direita
			if(catx > 0){ // colideu na esquerda
				p1.worldX += overlapx;
			}else{
				p1.worldX -= overlapx;
			}
		}
	}
}
function colide(p1, p2){
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		return true;
	}else{
		return false;
	}
}