// JavaScript Document
(() => {
  console.log('Javascript file loaded!');

//set constant variables here
  const theCanvas = document.querySelector('canvas'),
        ctx = theCanvas.getContext('2d'),
        player = {x:275, y:550, width:50, height:50, lives: 3, speed: 12},
        mouseTracker = { x : theCanvas.width/2},
        //bullets = [],
        enemy1 = document.querySelector('.enemy1'),
        enemy2 = document.querySelector('.enemy2'),
        enemy3 = document.querySelector('.enemy3'),
        playerLives = [1,2,3],
        // boxes = [
        //   {x: 30, y: 30, x1 :30, y1: 30, image: enemy1, xspeed: 5, yspeed: 8, points : 10 },
        //   {x: 90, y: 90, x1 :40, y1: 40, image: enemy2, xspeed: 5, yspeed: 8, points : 5},
        //   {x: 150, y: 150, x1 :30, y1: 30, image: enemy3, xspeed: 5, yspeed: 8, points : 5}
        // ],
        playerImg = document.querySelector('.ship'),
        pauseButton = document.querySelector('.pause'),
        playButton = document.querySelector('.play'),
        resetButtom = document.querySelector('.reset'),
        resetScreen = document.querySelector('.level-up');

        var playState = true,
            score = 0,
            boxes = [
              {x: randomX(), y: 30, x1 :30, y1: 30, image: enemy1, xspeed: 5, yspeed: 8, points : 10 },
              {x: randomX(), y: 90, x1 :40, y1: 40, image: enemy2, xspeed: 5, yspeed: 8, points : 5},
              {x: randomX(), y: 150, x1 :30, y1: 30, image: enemy3, xspeed: 5, yspeed: 8, points : 5}
            ],
            bullets = [],
            mousePos = theCanvas.width/2;


function draw() {
  ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.font = '18px sans-serif';
  //score counter
  ctx.fillText(`Score: ${score}`, 500, 20);
  // draw player lives
  playerLives.forEach((player, index) => {
    ctx.drawImage(playerImg, 10 + (index * 26), 10, 20, 28);
  });

  //draw the mouse tracker
  ctx.beginPath();
  ctx.moveTo(mouseTracker.x, theCanvas.height - 10);
  ctx.lineTo(mouseTracker.x - 5, theCanvas.height);
  ctx.lineTo(mouseTracker.x + 5, theCanvas.height);
  ctx.fillStyle = 'rgba(2555, 255, 255, 0.8)';
  ctx.fill();

  dx = mousePos - player.x;
  player.x += (dx/10);

  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  bullets.forEach((bullet, index) =>{
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);

    bullet.y -= bullet.speed;

    bulletIndex = index;

    //check if the bullets hit any of the boxes
    boxes.forEach((box, index) => {
    if (bullet.y <= (box.y + box.y1) && bullet.y > box.y && bullet.x > box.x && bullet.x < (box.x + box.x1)) {
      // delete the square
      //delete boxes[index];
      //delete bullets[bulletIndex];

      bullets.splice(bulletIndex, 1);
      boxes.splice(index, 1);

      score += box.points;

      let boomSound = document.createElement('audio');
      boomSound.src = "audio/explosion.mp3";

      document.body.appendChild(boomSound);

      boomSound.addEventListener('ended', () => {
      document.body.removeChild(boomSound);
      });

      boomSound.play();

      if (boxes.length == 0){
        console.log('Level Up!');
        //call the lvlUp function
        lvlUp();
      }
    }
  });

    if (bullet.y < 0){
      bullets.splice(index, 1);
    }
  });

  //draw the boxes (enemies)
  boxes.forEach(box => {
    ctx.fillStyle = box.color;
    ctx.drawImage(box.image, box.x, box.y, box.x1, box.y1);

    if(box.x + box.x1 > theCanvas.width){
      box.x += box.xspeed *= -1;
    }else if (box.x < 0) {
    box.xspeed *= -1;
    }

    if(box.y + box.y1 > theCanvas.height - 100){
      box.y += box.yspeed *= -1;
    }else if (box.y < 0) {
    box.yspeed *= -1;
    }


    box.x += box.xspeed;
    box.y += box.yspeed;
  });

  if (playState == false) {
    return
  }


  window.requestAnimationFrame(draw);
}

// function movePlayer(e) {
//   switch (e.keyCode) {
//     case 37:
//       if (player.x > 0 ) {
//         player.x -= player.speed;
//       }
//       break;
//
//       case 39:
//         if (player.x + player.width < theCanvas.width ) {
//           player.x += player.speed;
//         }
//         break;
//
//     default:
//       //do nothing (player isnt even moving so dont move it)
//   }
// }

function moveShip(e) {
  //player.x = e.clientX - theCanvas.offsetLeft;
  mousePos = (e.clientX - theCanvas.offsetLeft) - player.width / 2;
  mouseTracker.x = e.clientX - theCanvas.offsetLeft;
}


function createBullet() {
  let newBullet = {
    x: (player.x + player.width/2 - 2.5),
    y: (theCanvas.height - player.height - 10),
    x2: 5,
    y2: 10,
    speed: 8
  }

  let laser = document.createElement('audio');
  laser.src = "audio/laser.mp3";
  document.body.appendChild(laser);

  laser.addEventListener('ended', () =>{
    document.body.removeChild(laser);
  });

  laser.play();
  bullets.push(newBullet);
}

function pauseGame() {
  playState = false;
}

function playGame() {
  playState = true;
  window.requestAnimationFrame(draw);
}

function reetGame() {

}

function lvlUp() {
  playState = false;
  //make the game a litte harder and restart
  resetScreen.classList.add('show-level-up');
}

function resetGame() {
  boxes = [
    {x: randomX(), y: 30, x1 :30, y1: 30, image: enemy1, xspeed: 5, yspeed: 7, points : 10 },
    {x: randomX(), y: 90, x1 :40, y1: 40, image: enemy2, xspeed: 8, yspeed: 6, points : 5},
    {x: randomX(), y: 150, x1 :30, y1: 30, image: enemy3, xspeed: 5, yspeed: 8, points : 5},
    {x: randomX(), y: 30, x1 :30, y1: 30, image: enemy1, xspeed: 7, yspeed: 7, points : 10 },
    {x: randomX(), y: 90, x1 :40, y1: 40, image: enemy2, xspeed: 5, yspeed: 8, points : 5},
    {x: randomX(), y: 150, x1 :30, y1: 30, image: enemy3, xspeed: 6, yspeed: 8, points : 5}
  ];

  bullets = [];

  player.x = theCanvas.width / 2;
  playState = true;
  resetScreen.classList.remove('show-level-up');

  window.requestAnimationFrame(draw);
}

function randomX() {
  return Math.floor(Math.random()*(theCanvas.width - 100));
}


window.requestAnimationFrame(draw);

theCanvas.addEventListener('click', createBullet);
theCanvas.addEventListener('mousemove', moveShip);

pauseButton.addEventListener('click', pauseGame);
playButton.addEventListener('click', playGame);
resetButtom.addEventListener('click', resetGame);
})();
