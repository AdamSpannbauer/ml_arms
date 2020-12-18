const labelStep = (isLearning) => {
  let title;
  let titleY;
  let details;
  let detailsY;

  if (isLearning) {
    title = 'Learning Phase';
    details = 'The arm\'s joint angles are random.\nEach frame, the joint angles and arm endpoint location is saved.';
    titleY = height - 12 * 2 - 20;
    detailsY = height - 2 * textSize();
  } else {
    title = 'Goal Chasing Phase';
    details = 'The arm only knows how to move to a dot seen in the learning phase.\nIf a new location is passed through on the way to a known location,\nthen that location\'s info is saved as well.';
    titleY = height - 12 * 4 - 20;
    detailsY = height - 4 * textSize();
  }

  push();
  noStroke();

  textAlign(CENTER);
  textSize(20);
  text(title, width / 2, titleY - 30);

  textSize(12);
  text(details, width / 2, detailsY - 30);

  pop();
};

export default labelStep;
