let player = null;
let cars = [];
let lanes = [20, 120];

nome_jogocar.innerText = "Corrida";

function start(){
  player = newPiece(20, 330); // Começa na pista esquerda
  player.className = "piece";
  player.id = "player";
  direction = 39; // Direita inicialmente, mas não afeta
  cars = [];
  // Spawn initial car na mesma pista
  let car = newPiece(20, 0);
  car.className = "piece car";
  cars.push(car);
}

function loop(){
  movePlayer();
  moveCars();
  spawnCar();
  checkCollisions();
  if(gameOver()) return;
}

function movePlayer(){
  let newLeft = getPosition(player, "left");
  let newTop = getPosition(player, "top");
  // Sem movimento vertical
  switch (direction) {
    case 37: // Esquerda
      newLeft = Math.max(20, newLeft - 100);
      break;
    case 39: // Direita
      newLeft = Math.min(120, newLeft + 100);
      break;
  }
  
  let canMove = true;
  cars.forEach(car => {
    if (getPosition(car, "left") === newLeft && getPosition(car, "top") === newTop) {
      canMove = false;
    }
  });
  if (canMove) {
    player.style.left = newLeft + "px";
    player.style.top = newTop + "px";
  }
}

function moveCars(){
  let spawned = false;
  cars.forEach(car => {
    let top = getPosition(car, "top") + 20;
    car.style.top = top + "px";
    if (top > 200 && cars.length < 2 && !spawned) {
      // Quando um carro chega mais ou menos na metade spawna outro carro pra não vir dois juntos
      let lane = lanes[Math.floor(Math.random() * 2)];
      let laneOccupied = cars.some(c => getPosition(c, "left") === lane);
      if (!laneOccupied) {
        let newCar = newPiece(lane, 0);
        newCar.className = "piece car";
        cars.push(newCar);
        spawned = true;
      }
    } 
    if (top > 380) {
      // tira o carro da tela quando passa da borda e da os pontos
      car.remove();
      cars = cars.filter(c => c !== car);
      pointscar.innerText = parseInt(pointscar.innerText) + 1;
      // Acelera o jogo em 1.050x
      clearInterval(timer);
      time *= 0.950;
      timer = setInterval(loop, time);
    }
  });
}

function spawnCar(){

}

function checkCollisions(){
  cars.forEach(car => {
    if (colision(player, car)) {
      endGame();
    }
  });
}

function gameOver(){
  let top = getPosition(player, "top");
  if (top < 0) {
    
    return false;
  }
  
  return false;
}