let time = 500
let timer = setInterval(loop, time);
let direction = null;
let snake = null;
let piece = null;
let pieceOn = false;

document.body.onkeydown = function (e) {
  if(e.which >= 37 && e.which <=40)
    direction = e.which;
};

start(); // Executa a função que inicia as variáveis

function start(){
  head.style.left = 0;
  head.style.top = 0;
  direction = 39; // para direita
  snake = [head];
}

function loop(){
  gameOver();
  createPiece();
  getPiece();
  refreshTail();
  move();
}

function move(){
  switch (direction) {
    case 37: // Esquerda
      snake[0].style.left = (getPosition(snake[0], "left")-20) + "px";
      break;
    case 38: // Cima
      snake[0].style.top = (getPosition(snake[0], "top")-20) + "px";
      break;
    case 39: // Direita
      snake[0].style.left = (getPosition(snake[0], "left")+20) + "px";
      break;
    case 40: // Baixo
      snake[0].style.top = (getPosition(snake[0], "top")+20) + "px";
      break;
  }
}

function createPiece(){
  if(!pieceOn){
    let left = Math.floor(Math.random() * 9) * 20;
    let top = Math.floor(Math.random() * 9) * 40;
    piece = document.createElement("div");
    piece.className = "piece";
    piece.id = snake.length
    piece.style.left = left+"px";
    piece.style.top = top+"px";
    field.insertBefore(piece, snake[0]);
    pieceOn = true;
  }
}

function gameOver(){
  let left = getPosition(snake[0], "left");
  let top = getPosition(snake[0], "top");
  if(left < 0 || left > 180 || top < 0 || top > 380){
    clearInterval(timer);
    alert("Game Over");
  }
  else{
    snake.forEach(function(piece, index, array){
      if(index > 1){
        if(colision(snake[0], piece)){
          clearInterval(timer);
          alert("Game Over");
        }
      }
    });
  }
}

function getPiece(){
  if(colision(snake[0], piece)){
    pieceOn = false;
    // $(piece).remove();
    piece.className = "piece tail";
    snake.push(piece);

    clearInterval(timer);
    time -= 10
    timer = setInterval(loop, time);
  }
}

function refreshTail(){
  snake.forEach(function(piece, index, array){
    if(index > 0){
      if(array.length > index+1){
        piece.style.left = getPosition(array[index+1], "left")+"px";
        piece.style.top = getPosition(array[index+1], "top")+"px";
        // $(piece).css({left: getPosition(array[index+1], "left")+"px", top: getPosition(array[index+1], "top")+"px"})
      }
      else{
        piece.style.left = getPosition(snake[0], "left")+"px";
        piece.style.top = getPosition(snake[0], "top")+"px";
        // $(piece).css({left: getPosition(snake[0], "left")+"px", top: getPosition(snake[0], "top")+"px"})
      }
    }
  });
}

function colision(objA, objB){
  let aLeft = getPosition(objA, "left");
  let aTop = getPosition(objA, "top");
  let bLeft = getPosition(objB, "left");
  let bTop = getPosition(objB, "top");
  
  return (aLeft == bLeft && aTop == bTop)
}

function getPosition(obj, direction){  
  return parseInt(obj.style[direction])
}
