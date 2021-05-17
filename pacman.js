const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const width = 28;
let direction = 0;
let pacmanCurrentPosition = 224;
let speedPacman = 300;
let totalScore = 0;
let boxes = [];
let junctions = [];
let pacmanRotation = 0; 
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
    4, 4, 1, 0, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 1, 4, 4,
    1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4,
    4, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 4,
    4, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 4,
    4, 4, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 4, 4,
    4, 4, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 4, 4,
    4, 4, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 4, 4,
    4, 4, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 4, 4,
    4, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 4,
    1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    4, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 4,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 3, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 3, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]
//Counts the number of pellets and dots. To win the game all pellets and dots must be eaten.
let pelletsAndDots = layout.filter(x => x === 3 || x === 0).length - 1;

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const box = document.createElement('div');
        grid.appendChild(box);
        boxes.push(box);
        if (layout[i] === 0) {
            boxes[i].classList.add('dot');
        } else if (layout[i] === 1) {
            boxes[i].classList.add('wall');
        } else if (layout[i] === 2) {
          boxes[i].classList.add('ghost-area');
        } else if (layout[i] === 3) {
            boxes[i].classList.add('power-pellet');
        }
    }
}

createBoard();
findJunctions();
boxes[pacmanCurrentPosition].classList.add('pacman');
boxes[pacmanCurrentPosition].classList.remove('dot');
document.addEventListener('keydown', control);

/*For the ghosts to be able to change their directions at junctions,
junction positions are needed. For this reason these positions are found
 and recorded in junctions array as below*/

function findJunctions() {
  for (let i = 0; i < boxes.length; i++) {
    const dir = [-1, 1, -width, width];
    let noOfWays = 0;
    if (boxes[i].classList.contains('dot')) {
      for (let j = 0; j < dir.length; j++) {
        boxes[i + dir[j]].classList.contains('wall') ? noOfWays : noOfWays++;
      }
    noOfWays > 2 ? junctions.push(i) : junctions;
    }
  }
}

function control(e) {
  switch (e.keyCode) {
    case 40:
    //backward
    direction = +width;
    pacmanRotation = 90;
    break;
    case 38:
    //forward
    direction = -width;
    pacmanRotation = -90; 
    break;
    case 37:
    //to the left
    direction = -1;
    pacmanRotation = 180;
    break;
    case 39:
    //to the right
    direction = 1;
    pacmanRotation = 0;
    break;
  };
}
//There are 4 locations to be teleported.
let portIn = [251, 224, 559, 532];
let portOut = [532, 559, 224, 251];

function move() {
  boxes[pacmanCurrentPosition].classList.remove('pacman');
  let nextPosition = pacmanCurrentPosition + direction;
  if (boxes[nextPosition].classList.contains('wall') &&
      portIn.includes(pacmanCurrentPosition) &&
      direction !== width &&
      direction !== -width) {
      pacmanCurrentPosition = portOut[portIn.indexOf(pacmanCurrentPosition)];
    } else if (boxes[nextPosition].classList.contains('wall')) {
      direction = 0;
    } else {
    pacmanCurrentPosition += direction;
  }
  boxes[pacmanCurrentPosition].classList.add('pacman');
  document.documentElement.style.setProperty('--angle', pacmanRotation+'deg')
  if (boxes[pacmanCurrentPosition].classList.contains('dot')) {
      boxes[pacmanCurrentPosition].classList.remove('dot');
      pelletsAndDots--;
      totalScore++;
  };
  powerPelletEaten();
  score.textContent = totalScore;
  gameOverCheck();
  gameWinCheck();
}

class Ghost {
  constructor(name, position, speed) {
    this.ghostName = name
    this.ghostStartPosition = position
    this.ghostSpeed = speed
    this.ghostCurrentPosition = position
    this.scared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('alpha', 349, 140),
  new Ghost('beta', 351, 190),
  new Ghost('theta', 378, 240),
  new Ghost('zeta', 405, 290)
];

ghosts.forEach(ghost => {
  boxes[ghost.ghostStartPosition].classList.add(ghost.ghostName, 'ghost');
});
ghosts.forEach(ghost => ghostMove(ghost));

let timerIdPacman = setInterval(move, speedPacman);

function ghostMove(ghost){
  const dir = [-1, 1, -width, width];
  let ghostDir = dir[Math.floor(Math.random()*4)];
  ghost.timerId = setInterval(function(){
    if (!boxes[ghost.ghostCurrentPosition + ghostDir].classList.contains('wall') &&
    !boxes[ghost.ghostCurrentPosition + ghostDir].classList.contains('ghost') &&
    !boxes[ghost.ghostCurrentPosition + ghostDir].classList.contains('power-pellet')){
      boxes[ghost.ghostCurrentPosition].classList.remove(ghost.ghostName, 'ghost', 'scared-ghost');
    ghost.ghostCurrentPosition += ghostDir;
    boxes[ghost.ghostCurrentPosition].classList.add(ghost.ghostName, 'ghost');
      if (junctions.includes(ghost.ghostCurrentPosition)) {
        ghostDir = dir[Math.floor(Math.random()*4)];
      }
    } else {
      ghostDir = dir[Math.floor(Math.random()*4)];
    }
    if (ghost.scared) {
      boxes[ghost.ghostCurrentPosition].classList.add('scared-ghost');
    }
    if (ghost.scared && ghost.ghostCurrentPosition === pacmanCurrentPosition) {
      boxes[ghost.ghostCurrentPosition].classList.remove(ghost.ghostName, 'scared-ghost', 'ghost');
      ghost.ghostCurrentPosition = ghost.ghostStartPosition;
      totalScore += 100;
      boxes[ghost.ghostCurrentPosition].classList.add(ghost.ghostName, 'ghost');
      ghost.scared = false;
    }
    gameOverCheck();
    gameWinCheck();
  }, ghost.ghostSpeed)
}

function powerPelletEaten() {
  if (boxes[pacmanCurrentPosition].classList.contains('power-pellet')) {
    boxes[pacmanCurrentPosition].classList.remove('power-pellet');
    pelletsAndDots--;
    totalScore += 10;
    ghosts.forEach(ghost => ghost.scared = true)
    setTimeout (function () {
      ghosts.forEach(ghost => ghost.scared = false)
    }, 10000)
  };
}

function gameOverCheck() {
  if (boxes[pacmanCurrentPosition].classList.contains('ghost') &&
  !boxes[pacmanCurrentPosition].classList.contains('scared-ghost')) {
    direction = 0;
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    clearInterval(timerIdPacman);
    document.removeEventListener('keydown', control);
    score.textContent = 'You Lose!'
  }
}

function gameWinCheck() {
  if (pelletsAndDots === 0) {
    direction = 0;
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    clearInterval(timerIdPacman);
    document.removeEventListener('keydown', control);
    score.textContent = 'You Win!'
  }
}