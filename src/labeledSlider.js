export default class LabeledSlider {
  constructor({
    min, max, value, step, posX, posY, label = 'Slider',
  }) {
    this.posX = posX;
    this.posY = posY;
    this.label = label;
    // eslint-disable-next-line no-undef
    this.slider = createSlider(min, max, value, step);
    this.slider.position(posX, posY);
  }

  value() {
    return this.slider.value();
  }

  draw() {
    push();
    noStroke();
    fill(0);
    textSize(12);
    text(this.label, this.posX, this.posY - 5);
    pop();
  }
}
