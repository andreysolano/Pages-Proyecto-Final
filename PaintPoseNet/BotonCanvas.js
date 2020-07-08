class BotonCanvas extends Boton{
  constructor(x, y, w, h, colR, colG, colB, ref) {
    super(x, y, w, h, colR, colG, colB);
    this.ref = ref;
  }
  
  showN() {
    rectMode(CORNER);
    fill(0,100);
    rect(this.x + 3, this.y + 3, this.w + 3, this.h + 3);
    fill(255,255,255);
    push();
    stroke(this.colR,this.colG,this.colB);
    rect(this.x, this.y, this.w, this.h);  
    pop();
  }
  
  setCanvas(){
    if (l_Wrist.x>= this.x && l_Wrist.x<= (this.x + this.w) && l_Wrist.y <= (this.y + this.h) && l_Wrist.y >= this.y){
      canvasUsed = this.ref;    
    }
  
  }
}
