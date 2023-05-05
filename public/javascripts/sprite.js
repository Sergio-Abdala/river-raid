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
        this.flag = null;
    //metodos..............................
    this.desenha = function(){
        //if (this.exibir) {
            ctx.drawImage(this.img, this.srcX, this.srcY, this.lar, this.alt, this.posX, this.posY, this.lar, this.alt);
        //}		
    }
    this.exe = function(){
        
    }
}