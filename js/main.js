// JavaScript Document
(() => {
  console.log('Javascript file loaded!');

//set constant variables here
  const theCanvas = document.querySelector('canvas'),
        ctx = theCanvas.getContext('2d'),
        player = {x:275, y:550, width:50, height:50, lives: 3, speed: 12},
        bullets = [],
        boxes = [
          {x: 30, y: 30, x1 :30, y1: 30, color: 'rgba(0, 0, 200, 0.5)', xspeed: 5, yspeed: 8 },
          {x: 90, y: 90, x1 :40, y1: 40, color: 'rgba(0, 0, 200, 0.5)', xspeed: 5, yspeed: 8 },
          {x: 150, y: 150, x1 :30, y1: 30, color: 'rgba(200, 0, 0, 0.5)', xspeed: 5, yspeed: 8 }
        ],
        playerImg = document.querySelector('.ship'),
        pauseButton = document.querySelector('.pause'),
        playButton = document.querySelector('.play');

        var playState = true;

function draw() {
  ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  bullets.forEach((bullet, index) =>{
    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);

    bullet.y -= bullet.speed;

    bulletIndex = index;

    //check if the bullets hit any of the boxes
    boxes.forEach((box, index) => {
    if (bullet.y <= (box.y + box.y1) && bullet.y > box.y && bullet.x > box.x < (box.x + box.x1)) {
      // delete the square
      delete boxes[index];
      delete bullets[bulletIndex];

      let boomSound = document.createElement('audio');
      boomSound.src = "audio/explosion.mp3";

      document.body.appendChild(boomSound);

      boomSound.addEventListener('ended', () => {
      document.body.removeChild(boomSound);
      });

      boomSound.play();
    }
  });

    if (bullet.y < 0){
      delete bullets[index];
    }
  });

  //draw the oxes (enemies)
  boxes.forEach(box => {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.x1, box.y1);

    if(box.x + box.x1 > theCanvas.width){
      box.x += box.xspeed *= -1;
    }else if (box.x < 0) {
    box.xspeed *= -1;
    }

    if(box.y + box.y1 > theCanvas.width){
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
  player.x = e.clientX - theCanvas.offsetLeft;
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


window.requestAnimationFrame(draw);

theCanvas.addEventListener('click', createBullet);
theCanvas.addEventListener('mousemove', moveShip);

pauseButton.addEventListener('click', pauseGame);
playButton.addEventListener('click', playGame);
})();
