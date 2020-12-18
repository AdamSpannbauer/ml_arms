/* eslint-disable import/extensions */
import ArmSegment from './armSegment.js';
import angleUtils from './angleUtils.js';
import knn from './nnUtils.js';

export default class Arm {
  constructor(x1, y1, lengths, strokeWeights, gridSize) {
    this.memory = {};
    this.armSegs = [];
    this.gridSize = gridSize || 5;

    for (let i = 0; i < lengths.length; i += 1) {
      if (i === 0) {
        this.armSegs.push(new ArmSegment(x1, y1, lengths[i], strokeWeights[i]));
      } else {
        const { x2, y2 } = this.armSegs[i - 1];
        this.armSegs.push(new ArmSegment(x2, y2, lengths[i], strokeWeights[i]));
      }
    }
  }

  saveState() {
    const lastSeg = this.armSegs[this.armSegs.length - 1];
    const pos = {
      x: knn.roundToNearest(lastSeg.x2, this.gridSize),
      y: knn.roundToNearest(lastSeg.y2, this.gridSize),
    };
    const key = `${pos.x},${pos.y}`;
    const sqError = knn.sqDist(pos.x, pos.y, lastSeg.x2, lastSeg.y2);

    // Don't relearn unless closer to rounded grid point
    if (
      key in this.memory
      && this.memory[key][sqError] <= sqError
    ) return;

    const state = {
      angles: this.armSegs.map((seg) => angleUtils.constrainAngle(seg.angle)),
      pos: { x: lastSeg.x2, y: lastSeg.y2 },
      sqError,
    };

    this.memory[key] = state;
  }

  updateGoal(x, y) {
    // Hardcoded to k=1 as of now
    const [closestMemory] = knn.retrieveKClosestMemories(x, y, this.memory);

    let goalAngle;
    let angleDiff;
    let segI;

    for (let i = 0; i < this.armSegs.length; i += 1) {
      segI = this.armSegs[i];

      // Step segment closer to angles in memory to reach goal
      goalAngle = closestMemory.angles[i];
      angleDiff = angleUtils.minAngleDiff(goalAngle, segI.angle);
      segI.angle += constrain(angleDiff, -0.1, 0.1);

      // Update start point of segment to end point of prev segment
      if (i > 0) {
        const { x2, y2 } = this.armSegs[i - 1];
        segI.x1 = x2;
        segI.y1 = y2;
      }

      segI.updateX2Y2();
    }
    this.saveState();
  }

  updateRandom() {
    this.armSegs.forEach((seg, i) => {
      let prevSeg;
      if (i > 0) {
        prevSeg = this.armSegs[i - 1];
        // eslint-disable-next-line no-param-reassign
        seg.x1 = prevSeg.x2;
        // eslint-disable-next-line no-param-reassign
        seg.y1 = prevSeg.y2;
      }
      seg.updateRandom();
    });

    this.saveState();
  }

  draw() {
    this.armSegs.forEach((seg) => {
      seg.draw();
    });
  }

  drawKnowledge() {
    Object.values(this.memory).forEach((mem) => {
      push();
      fill(0, 100);
      noStroke();
      ellipse(mem.pos.x, mem.pos.y, 3, 3);
      pop();
    });
  }
}
