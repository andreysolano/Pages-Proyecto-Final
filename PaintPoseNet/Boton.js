class Boton {
  
  constructor(x, y, w, h, colR, colG, colB) {
    this.x = x; 
    this.y = y; 
    this.w = w;
    this.h = h;
    this.colR = colR;
    this.colG = colG;
    this.colB = colB;
    
  }

  show() {
    noStroke();
    rectMode(CORNER);
    fill(0,100);
    rect(this.x + 3, this.y + 3, this.w + 3, this.h + 3);
    fill (this.colR,this.colG,this.colB);
    rect(this.x, this.y, this.w, this.h);  
  }
  
  action(){
    if (l_Wrist.x>= this.x && l_Wrist.x<= (this.x + this.w) && l_Wrist.y <= (this.y + this.h) && l_Wrist.y >= this.y){
      pincelR = this.colR;
      pincelG = this.colG;
      pincelB = this.colB;

    } 
    
  }
  
  
  
  
  
  
  
  
  
  
}
