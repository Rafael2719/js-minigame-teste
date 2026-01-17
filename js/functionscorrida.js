let time = 500;
let timer = null;
let direction = null;

btn_top.onclick = () => {direction = 38};
btn_left.onclick = () => {direction = 37};
btn_right.onclick = () => {direction = 39};
btn_botton.onclick = () => {direction = 40};
btn_start.onclick = startGame;
btn_end.onclick = endGame;
document.body.onkeydown = function (e) {
  if(e.which >= 37 && e.which <=40){ // Teclas direcionais
    direction = e.which;
  } else if(e.which == 32){ // Barra de espaço
    startGame();
  } else if(e.which == 19){ // Botão de pause
    endGame();
  }
}

// (Re)Inicia o timer do jogo e chama a função start()
function startGame(){
  if(timer != null) endGame();
  Array.from(field.children).forEach(function(p){p.remove();});
  time = 500;
  timer = setInterval(loop, time);
  start(); // Tem que ser criada no sou próprio Javascript
}

function endGame(){
  clearInterval(timer);
  alert("Game Over");
  timer = null;
  return true;
}

function newPiece(left, top){
    piece = document.createElement("div");
    piece.className = "piece";
    piece.style.left = left+"px";
    piece.style.top = top+"px";
    field.appendChild(piece);  
    return piece;
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
