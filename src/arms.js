// eslint-disable-next-line import/extensions
import Arm from './arm.js';

export default class Arms {
  constructor(nArms, nJoints) {
    this.arms = [];
    this.learning = true;

    for (let i = 0; i < nArms; i += 1) {
      const lens = [];
      const sws = [];

      // Generate random arm segment lengths and stroke widths
      for (let j = 0; j < nJoints; j += 1) {
        const minLen = 50 - j * 10;
        const maxLen = 80 - j * 10;
        lens.push(random(minLen, maxLen));

        let sw = 10 - j * 2;
        if (sw <= 0) sw = 1;
        sws.push(sw);
      }

      // Final segment always same
      lens.push(10);
      sws.push(1);

      const arm = new Arm(0, 0, lens, sws, 10);
      this.arms.push(arm);
    }
  }

  updateAndDraw(drawKnowledge) {
    this.arms.forEach((arm) => {
      if (this.learning) {
        stroke(0, 5);
        arm.updateRandom();
      } else {
        stroke(0, 200);
        arm.updateGoal(mouseX - width / 2, mouseY - height / 2);
      }
      arm.draw();

      if (drawKnowledge) {
        arm.drawKnowledge();
      }
    });
  }
}
