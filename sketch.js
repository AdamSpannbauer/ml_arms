// eslint-disable-next-line import/extensions
import armClass from './src/arm.js';

const canvasW = 512;
const canvasH = 512;

const arms = [];
const nArms = 1;

let learning = true;
const learningFrames = 500;

const armPlacementRadius = 0;

function setup() {
  createCanvas(canvasW, canvasH);

  for (let i = 0; i < nArms; i += 1) {
    const angle = i * (TWO_PI / nArms);
    const x = cos(angle) * armPlacementRadius;
    const y = sin(angle) * armPlacementRadius;

    const lens = [];
    const sws = [];
    for (let j = 0; j < round(random(1, 5)); j += 1) {
      const minLen = 50 - j * 10;
      const maxLen = 80 - j * 10;
      lens.push(random(minLen, maxLen));

      sws.push(10 - j * 2);
    }

    lens.push(10);
    sws.push(1);

    const arm = new armClass.Arm(x, y, lens, sws);

    arms.push(arm);
  }
}

function draw() {
  if (frameCount > learningFrames) {
    learning = false;
  }

  if (!learning) {
    background(200);
  }
  translate(width / 2, height / 2);

  noStroke();
  fill(noise(frameCount * 0.001) * 150);
  // ellipse(0, 0, armPlacementRadius * 2);

  arms.forEach((arm) => {
    if (learning) {
      stroke(0, 10);
      arm.updateRandom();
    } else {
      stroke(0, 200);
      arm.updateGoal(mouseX - width / 2, mouseY - height / 2);
    }
    arm.draw();
    arm.drawKnowledge();
  });
}

window.setup = setup;
window.draw = draw;
