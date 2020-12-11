// eslint-disable-next-line import/extensions
import armClass from './src/arm.js';

const learningBGColor = [250, 250, 250];
const chasingBGColor = [200, 200, 200];

let resetButton;
let nJointsSlider;
let nArmsSlider;

let arms;

let learning = true;
const learningFrames = 500;

const armPlacementRadius = 0;

let t = 0;

function reset() {
  background(learningBGColor);

  t = 0;
  learning = true;

  arms = [];
  for (let i = 0; i < nArmsSlider.value(); i += 1) {
    const angle = i * (TWO_PI / nArmsSlider.value());
    const x = cos(angle) * armPlacementRadius;
    const y = sin(angle) * armPlacementRadius;

    const lens = [];
    const sws = [];
    for (let j = 0; j < nJointsSlider.value(); j += 1) {
      const minLen = 50 - j * 10;
      const maxLen = 80 - j * 10;
      lens.push(random(minLen, maxLen));

      let sw = 10 - j * 2;
      if (sw <= 0) sw = 1;
      sws.push(sw);
    }

    lens.push(10);
    sws.push(1);

    const arm = new armClass.Arm(x, y, lens, sws);

    arms.push(arm);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  nArmsSlider = createSlider(1, 3, 1, 1);
  nArmsSlider.position(10, 30);
  nJointsSlider = createSlider(2, 6, int(random(2, 7)), 1);
  nJointsSlider.position(10, 70);

  resetButton = createButton('Reset');
  resetButton.position(10, 95);
  resetButton.mouseClicked(reset);

  reset();
}

function draw() {
  t += 1;
  if (t > learningFrames) {
    learning = false;
  }

  if (!learning) {
    background(chasingBGColor);
  }
  noStroke();
  fill(0);
  text('Number of Arms', 10, 25);
  text('Number of Joints', 10, 65);

  translate(width / 2, height / 2);

  noStroke();
  fill(noise(frameCount * 0.001) * 150);
  // ellipse(0, 0, armPlacementRadius * 2);

  arms.forEach((arm) => {
    if (learning) {
      stroke(0, 5);
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
