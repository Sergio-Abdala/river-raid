function Sprite(imgSrc){
	//atributos.............................
		this.img = new Image();
		this.img.src = imgSrc;
        this.srcX = 0;
		this.srcY = 0;
        this.lar = 0;
		this.alt = 0;
		this.escala = 1;
        this.posX = 0;
		this.posY = 0;
        this.movRight = false;
		this.movLeft = false;
		this.movUp = false;
		this.movDown = false;
		this.speed = 3;
    //
    this.desenha = function(){
        if (this.exibir) {
            //Obs: para ajustar escala foi preciso dividir .lar && .alt pela escala nas dimensões de .lar & .alt na captura do sprite
            //P.s: a medida de escala tem de ser setada fixa no momento do load do sprite para mudar esta medida durante o jogo necessida excuir objeto do array sprites e inseri-lo novamente com a nova escala EX: sprites[encontrar('player')] = new Personagem()//com a nova escala;
            ctx.drawImage(this.img, this.srcX, this.srcY, this.lar*this.escala, this.alt*this.escala, this.posX, this.posY, this.lar, this.alt);// + this.lar * (this.esc + this.esc/2)
        }		
    }
}