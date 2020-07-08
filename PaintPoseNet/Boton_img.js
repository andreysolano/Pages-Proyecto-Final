class BotonImg extends Boton{
  constructor(x, y, w, h, colR, colG, colB, img) {
    super(x, y, w, h, colR, colG, colB);
    this.img = img;
  
  }
  
  showImg(){
    rectMode(CORNER);
    fill(0,40);
    rect(this.x + 3, this.y + 3, this.w + 3, this.h + 3);
    image(this.img, this.x, this.y, this.w, this.h);
  }
}
