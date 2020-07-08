class BotonFiltro extends Boton{
  constructor(x, y, w, h, colR, colG, colB) {
    super(x, y, w, h, colR, colG, colB);
  }
  
  showF() {
    rectMode(CORNER);
    noStroke();
    fill(0,100);
    rect(this.x + 3, this.y + 3, this.w + 3, this.h + 3);
    fill(this.colR,this.colG,this.colB,30);
    rect(this.x, this.y, this.w, this.h);  
  }
  
  setFiltro(){
    if (l_Wrist.x>= this.x && l_Wrist.x<= (this.x + this.w) && l_Wrist.y <= (this.y + this.h) && l_Wrist.y >= this.y){
      tint(this.colR,this.colG,this.colB);  
    }
  
  }
}
