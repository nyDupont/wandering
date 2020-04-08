window.addEventListener('keydown', ((evt) => {
  if (['w', 'a', 's', 'd'].includes(evt.key)) {
    if (!heldMvtKeys.includes(evt.key)) {

      heldMvtKeys.push(evt.key);
      const [motionState, direction] = positionVariation(heldMvtKeys);
      hero.setMotionState(motionState);
      hero.setDirection(direction);
  // } else if (evt.key == 'm' && hero.speed != hero.sprintSpeed) {
  //   hero.sprintOn();
    }
  } else if (evt.key == ' ') {
        hero.swirl.swirl();
  } else if (evt.key == 'c') {
      hero.loseHp(5);
  } else if (evt.key == 'p') {
      pause();
  } else if (evt.key == 'o') {
      foe = new Foe();
  }
}));

window.addEventListener('keyup', ((evt) => {
  if (['w', 'a', 's', 'd'].includes(evt.key)) {
    heldMvtKeys.splice(heldMvtKeys.indexOf(evt.key), 1);
    if (heldMvtKeys.length == 0) {
      hero.setMotionState('resting');
    } else {
      const [motionState, direction] = positionVariation(heldMvtKeys);
      hero.setMotionState(motionState);
      hero.setDirection(direction);
    }
  }
  // } else if (evt.key == 'm' && hero.speed != 0) {
  //   hero.sprintOff();
  // }
}));

let heldMvtKeys = [];
function positionVariation(heldMvtKeysArray) {
  const len = heldMvtKeysArray.length;
  let motionState;
  let direction;
  switch(len) {
    case 1: {
      motionState = 'moving';
      switch(heldMvtKeysArray[0]) {
        case 'w':
          direction = 'N';
          break;
        case 'd':
          direction = 'E';
          break;
        case 's':
          direction = 'S';
          break;
        case 'a':
          direction = 'W';
          break;
      }
      break;
    }
    case 2: {
      let a = heldMvtKeysArray[0];
      let b = heldMvtKeysArray[1];
      if ((a=='w' && b=='d') || (a=='d' && b=='w')) {
        motionState = 'moving';
        direction = 'NE';
      } else if ((a=='w' && b=='a') || (a=='a' && b=='w')) {
        motionState = 'moving';
        direction = 'NW';
      } else if ((a=='s' && b=='d') || (a=='d' && b=='s')) {
        motionState = 'moving';
        direction = 'SE';
      } else if ((a=='s' && b=='a') || (a=='a' && b=='s')) {
        motionState = 'moving';
        direction = 'SW';
      } else {
        motionState = 'resting';
        switch(b) {
          case 'w':
            direction = 'N';
            break;
          case 's':
            direction = 'S';
            break;
          case 'a':
            direction = 'W';
            break;
          case 'd':
            direction = 'E';
            break;
        }
      }
      break;
    }
    case 3: {
      motionState = 'moving';
      if (!heldMvtKeysArray.includes('s')) {
        direction = 'N';
      } else if (!heldMvtKeysArray.includes('w')) {
        direction = 'S';
      } else if (!heldMvtKeysArray.includes('d')) {// those two last do not work
        direction = 'W';
      } else if (!heldMvtKeysArray.includes('a')) {
        direction = 'E';
      }
      break;
    }
  }
  return [motionState, direction];
};

window.addEventListener('click', ((evt) => {
    mouseHeroAngle = angleBetweenObj(evt.clientX, evt.clientY, hero.x, hero.y)
    // shuriken = new ShurikenProjectile(hero, mouseHeroAngle);
    hero.sendEnvelope(mouseHeroAngle);
}));

function movingMouse(evt) {
  // hero.mire.setAngle(evt.clientX, evt.clientY);
}

function angleBetweenObj(bx, by, ax, ay) {
  let dx = bx - ax;
  if (dx == 0) { // handling dividing by zero in arctan
    dx = 1;
  }
  const dy =  by - ay;
  let angle = Math.atan(dy/dx);
  if (dx < 0) {
    angle += Math.PI;
  }
  return angle;
}
