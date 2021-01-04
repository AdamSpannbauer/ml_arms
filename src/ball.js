export default class Ball {
  constructor() {
    this.r = 25;
    this.p = createVector();

    this.goal = createVector();
    this.speedLimit = 2;

    this.noiseSeed = random(100);
    this.noiseStep = 0.005;
  }

  updateGoal() {
    const cx = width / 2;
    const cy = height / 2;
    const maxR = min([width, height]) * 0.4;

    if (dist(cx, cy, mouseX, mouseY) > maxR) {
      const n = noise(this.noiseSeed);
      this.noiseSeed += this.noiseStep;

      const r = n * maxR;
      const a = n * TWO_PI * 2;
      const x = cos(a) * r;
      const y = sin(a) * r;

      this.goal.set(x, y);
      this.speedLimit = 2;
    } else {
      this.goal.set(mouseX - cx, mouseY - cy);
      this.speedLimit = 10;
    }
  }

  update() {
    this.updateGoal();

    const v = p5.Vector.sub(this.goal, this.p);
    v.limit(this.speedLimit);
    this.p.add(v);
  }

  draw() {
    ellipse(this.p.x, this.p.y, this.r * 2);
  }
}
