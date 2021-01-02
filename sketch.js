/* eslint-disable import/extensions */
import Arms from './src/arms.js';
import Ball from './src/ball.js';
import LabeledSlider from './src/labeledSlider.js';
import labelStep from './src/labelStep.js';

const learningBGColor = [250, 250, 250];
const chasingBGColor = [200, 200, 200];

let arms;
let ball;
let t = 0;

let resetButton;
let sliders;

let nArmsSlider;
let nJointsSlider;
let learningLenSlider;

const nArmsSliderParams = {
  min: 1, max: 3, value: 1, step: 1, posX: 10, posY: 30, label: 'Number of Arms',
};

const nJointsSliderParams = {
  min: 2, max: 6, value: 5, step: 1, posX: 10, posY: 70, label: 'Number of Joints',
};

const learningLenSliderParams = {
  min: 0, max: 1000, value: 500, step: 100, posX: 10, posY: 110, label: 'Number of Learning Frames',
};

function reset() {
  background(learningBGColor);

  if (t > 0) {
    translate(-width / 2, -height / 2);
  }

  t = 0;
  arms = new Arms(nArmsSlider.value(), nJointsSlider.value());
  ball = new Ball();

  sliders.forEach((s) => s.draw());
  labelStep(arms.learning);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  nArmsSlider = new LabeledSlider(nArmsSliderParams);
  nJointsSlider = new LabeledSlider(nJointsSliderParams);
  learningLenSlider = new LabeledSlider(learningLenSliderParams);
  sliders = [nArmsSlider, nJointsSlider, learningLenSlider];

  // eslint-disable-next-line no-undef
  resetButton = createButton('Reset');
  resetButton.position(10, 140);
  resetButton.mouseClicked(reset);

  reset();
}

function draw() {
  t += 1;
  if (t > learningLenSlider.value()) {
    background(chasingBGColor);

    arms.learning = false;
    sliders.forEach((s) => s.draw());
    labelStep(arms.learning);
  }

  translate(width / 2, height / 2);
  if (!arms.learning) {
    ball.update();
  }

  const [goalX, goalY] = [ball.p.x, ball.p.y];
  arms.updateAndDraw({ goalX, goalY, drawKnowledge: true });

  if (!arms.learning) {
    const armEndPoints = arms.endPoints();
    let isTouched = false;
    armEndPoints.forEach(({ x, y }) => {
      const touching = dist(x, y, ball.p.x, ball.p.y) <= ball.r;
      isTouched = touching || isTouched;
    });

    push();
    noStroke();
    fill(0, 100);

    if (isTouched) {
      fill(100, 200, 100, 100);
    }

    ball.draw();
    pop();
  }
}

window.setup = setup;
window.draw = draw;
