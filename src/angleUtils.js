// Ensure angle in range [0, TWO_PI]
const constrainAngle = (a) => {
  if (a < -TWO_PI) return constrainAngle(a + TWO_PI);
  if (a > TWO_PI) return constrainAngle(a - TWO_PI);
  return a;
};

// Find minimal difference between 2 angles
const minAngleDiff = (target, source) => {
  let da = constrainAngle(target - source);
  if (da < -PI) { da += TWO_PI; }
  if (da > PI) { da -= TWO_PI; }
  return da;
};

export default { constrainAngle, minAngleDiff };
