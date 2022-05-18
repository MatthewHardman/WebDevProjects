
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highScore');
const startPosition = 250;
let snakeArray = [startPosition, 249, 248];
let direction = '';
let mousePosition = 258;
let score = 0;
let highScoreString = localStorage.getItem('highScore');
let highScore = JSON.parse(highScoreString) ?? 0;//sets to 0 if null (first run through)
let snakeLength = snakeArray.length;
let timeoutID;
let gameOverIndicator = 1; //will be set to 0 if game should end
let timer = 250; //time in ms
let snakeSpeed = $('#speed').val();

$('#speed').change(function(){
  snakeSpeed = $(this).val();
  if (snakeSpeed === 'medium'){
    timer = 250;
  }else if(snakeSpeed === 'slow'){
    timer = 500;
  }else if(snakeSpeed === 'fast'){
  timer = 125;
  }
});



function draw(){
  for(let i = 0; i<snakeArray.length; i++){
  squares[snakeArray[i]].classList.add('snake');
  
  }
}

function undraw(){
  for(let i=0; i<snakeArray.length; i++){
    squares[snakeArray[i]].classList.remove('snake');
  }
}

function drawMouse(){
  squares[mousePosition].classList.add('mouse');
}

function undrawMouse(){
  squares[mousePosition].classList.remove('mouse');
}

function eatMouse(){
  if (snakeArray[0] === mousePosition){
    undrawMouse();
    mousePosition = Math.floor(Math.random()*squares.length);
    while (squares[mousePosition].classList.contains('border') || squares[mousePosition].classList.contains('snake')){
      mousePosition = Math.floor(Math.random()*squares.length);
    }
    drawMouse();
    score += 10;
    scoreDisplay.innerHTML = score;
    let snakeTailCompare = snakeArray[snakeLength-2] - snakeArray[snakeLength-1];
    if (snakeTailCompare === 1){
      snakeArray.push(snakeArray[snakeLength-1]-1);
    }else if (snakeTailCompare === -1){
      snakeArray.push(snakeArray[snakeLength-1]+1);
    }else if (snakeTailCompare === 22){
      snakeArray.push(snakeArray[snakeLength-1]-22)
    }else if (snakeTailCompare === -22){
      snakeArray.push(snakeArray[snakeLength-1]+22)
    }
  }
}

function moveRight(){
  undraw();
  snakeArray.unshift(snakeArray[0]+1);
  snakeArray.pop();
  draw();  
}

function moveUp(){
  undraw();
  snakeArray.unshift(snakeArray[0]-22);
  snakeArray.pop();
  draw();
}

function moveDown(){
  undraw();
  snakeArray.unshift(snakeArray[0]+22);
  snakeArray.pop();
  draw();
}

function moveLeft(){
  undraw();
  snakeArray.unshift(snakeArray[0]-1);
  snakeArray.pop();
  draw();
}

document.addEventListener('keydown', control);

function control (e){
  if (e.keyCode === 37){
    direction = 'left';
  } else if (e.keyCode === 38){
    direction = 'up';
  } else if (e.keyCode === 39){
    direction = 'right';
  } else if (e.keyCode === 40){
    direction = 'down';
  }
}

function gameOver(){
  for(let i = 1; i<snakeArray.length; i++){
    if (snakeArray[0] === snakeArray[i]){
      scoreDisplay.innerHTML = score + ' Game Over!';
      gameOverIndicator = 0;
      if(score > highScore){
        localStorage.setItem('highScore', score);
        highScoreDisplay.innerHTML = 'New High Score! ' + score; 
      }
    } else if(squares[snakeArray[0]].classList.contains('border')){
      scoreDisplay.innerHTML = score + ' Game Over!';
      gameOverIndicator = 0;
      if(score > highScore){
        localStorage.setItem('highScore', score);
        highScoreDisplay.innerHTML = 'New High Score! ' + score; 
      }
    }
  }
}

function move(){
  if(direction === 'left'){
    moveLeft();
  }else if(direction === 'up'){
    moveUp();
  }else if(direction === 'right'){
    moveRight();
  }else if(direction === 'down'){
    moveDown();
  } 
  eatMouse();
  gameOver();
  if (gameOverIndicator !== 0){
  timeoutID = setTimeout(move, timer);
  }
}


highScoreDisplay.innerHTML = "High Score: " + highScore;
draw();
drawMouse();
move();






