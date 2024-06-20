class Block{
  constructor(index, x, y, size, value){
    this.index = index;
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.clicked = false;
  }
  
  draw(){
    push();
    var bg = color(80, 80, 80);
    if (this.clicked){
      bg = color(40, 40, 40);
      
      if (this.value==" "){
        bg = color(10, 10, 10);
      }
    }
    fill(bg);
    stroke(250, 120, 0);
    
    rect(this.x, this.y, this.size, this.size);
    
    if (this.clicked){
      text(this.value, this.x+(this.size/2), this.y+(this.size/2));
    }
    pop();
  }
}


