let WIDTH = 600
let HEIGHT = 600
let OFFSET = 40;
let SIZE = 40;
let MINE = 'X';
let N = 20; 
let RATIO = 0.2;
let board = [];
let nCorrect = 0;
let nNeighbors = 0;
let visited = [];
let started = false;
let gameover = false;
let dirs = [
  [1,0],
  [1,1],
  [0,1],
  [-1,1],
  [-1,0],
  [-1,-1],
  [0,-1],
  [1,-1],
];

function generateBoard(){
  board = [];
  let index = 0;
  for (let i=0; i<N; i++){
    var temp = [];
    for (let j=0; j<N; j++){
      var x = i*SIZE + OFFSET
      var y = j*SIZE + OFFSET
      var value = " ";
      
      if (random()<RATIO) {
        value = MINE;
      }
      
      temp.push(new Block(index, x, y, SIZE, value));
      index++;
    }  
    board.push(temp);
  }  
}

function isValidIndex(x, y){
  if ((x<0) || (x>=N) || (y<0) || (y>=N)){
    return false;
  }
  return true;
}

function searchNeighbors(){
  for (let i=0; i<N; i++){
    for (let j=0; j<N; j++){
      if (board[i][j].value==MINE){
        continue;
      }
      
      var count = 0;
      for (let k=0; k<dirs.length; k++){
        var x = j+dirs[k][0];
        var y = i+dirs[k][1];
        
        if (isValidIndex(x, y)!=true) {
          continue;
        }
        
        if (board[y][x].value==MINE){
          count++;
        }
      }
      
      if (count>0){
        nNeighbors++;
        board[i][j].value = count;
      }
    }
  }
}

function drawBoard(){
  for (let i=0; i<N; i++){
    for (let j=0; j<N; j++){
      board[i][j].draw();
    }
  }
}

function clearEmptyBlocks(i, j){
  if ((!isValidIndex(i, j)) || (visited.includes(board[i][j].index))) {
    return;
  }
  
  visited.push(board[i][j].index);
  
  board[i][j].clicked = true;
  
  if (Number.isInteger(board[i][j].value)){
    nCorrect++;
    return;
  }
  
  for (let k=0; k<dirs.length; k++){
    var x = j+dirs[k][0];
    var y = i+dirs[k][1];
    clearEmptyBlocks(y, x);    
  }
}

function mouseClicked(){
  if (!started){
    started = true;
    initialize();
    mouseClicked();
    return;
  }
  
  visited = [];
  for (let i=0; i<N; i++){
    for (let j=0; j<N; j++){
      if ((board[i][j].x<mouseX) && (board[i][j].x+SIZE>mouseX) &&
          (board[i][j].y<mouseY) && (board[i][j].y+SIZE>mouseY)){
        board[i][j].clicked = true;
        
        if (board[i][j].value==MINE){
          gameover = true;
          return;
        }
        console.log(nCorrect, nNeighbors);
        nCorrect++;
        clearEmptyBlocks(i, j);
      }
    }
  }
}

function initialize(){
  nCorrect = 0;
  nNeighbors = 0;
  generateBoard();
  searchNeighbors();
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  initialize();
}

function draw() {
  drawBoard();
  
  if (started){
    if (nCorrect==nNeighbors){
      gameover = true;
    }
    if (gameover){
      initialize();
      gameover = false;
    }
  }
}