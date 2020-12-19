export default class Ball {
  constructor() {
    this.r = 25;
    this.x = 0;
    this.y = 0;

    this.followMouse = false;

    this.posAngle = 0;
    this.dPosAngle = 0;
    this.dPosAngleSeed = random(100);

    this.posRadius = 0;
    this.maxPosRadius = width * 0.25;
    this.dPosRadius = 0;
    this.dPosRadiusSeed = random(100);

    this.noiseStep = 0.001;
  }

  updateNoise() {
    this.dPosAngle = map(noise(this.dPosAngleSeed), 0, 1, -PI * 0.01, PI * 0.01);
    this.posAngle += this.dPosAngle;

    this.dPosRadius = map(noise(this.dPosRadiusSeed), 0, 1, -1, 1);
    this.posRadius += this.dPosRadiusSeed;
    this.posRadius = constrain(this.posRadius, -this.maxPosRadius, this.maxPosRadius);

    this.x = cos(this.posAngle) * this.posRadius;
    this.y = sin(this.posAngle) * this.posRadius;

    this.posAngleSeed += this.noiseStep;
    this.posRadiusSeed += this.noiseStep * 2;
  }

  update() {
    if (this.followMouse) {
      this.x = mouseX;
      this.y = mouseY;
    } else {
      this.updateNoise();
    }
  }

  draw() {
    push();
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}
