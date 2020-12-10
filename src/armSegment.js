class ArmSegment {
  constructor(x1, y1, radius, strokeWeight) {
    this.x1 = x1;
    this.y1 = y1;
    this.radius = radius;
    this.strokeWeight = strokeWeight;

    // Randomly changed by updateRandom()
    this.angle = 0.0;

    // Used by noise to randomly move armsegment
    this.angleSeed = random(100);
    this.angleSeedStep = 0.01;

    // Set based on current this.angle by this.updateX2Y2
    this.x2 = 0.0;
    this.y2 = 0.0;

    this.updateRandom();
  }

  updateRandom() {
    this.angle = noise(this.angleSeed) * TWO_PI * 2;
    this.angleSeed += this.angleSeedStep;
    this.updateX2Y2();
  }

  updateX2Y2() {
    this.x2 = cos(this.angle) * this.radius + this.x1;
    this.y2 = sin(this.angle) * this.radius + this.y1;
  }

  draw() {
    push();
    strokeWeight(this.strokeWeight);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}

export default { ArmSegment };
