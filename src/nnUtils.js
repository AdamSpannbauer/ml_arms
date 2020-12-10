// Round to nearest multiple of choosing
// roundToNearest(10, 3) -> 9
// roundToNearest(11, 3) -> 12
const roundToNearest = (num, nearest) => {
  const x = num % nearest;
  const midPoint = nearest / 2;

  if (x < midPoint) return num - x;
  return num + nearest - x;
};

// Calculate euclidean distance squared
// Just need distance for comparisons
// Taking the sqrt doesnt add anything but overhead
const sqDist = (x1, y1, x2, y2) => (x1 - x2) ** 2 + (y1 - y2) ** 2;

// Given a goal (x, y), an array of memory objects, and k
// Retrieve k closest memories to the goal location
const retrieveKClosestMemories = (x, y, memory, k = 1) => {
  const sqDists = Object.values(memory).map(({ angles, pos }) => ({
    pos,
    angles,
    sqDist: sqDist(x, y, pos.x, pos.y),
  }));
  sqDists.sort((a, b) => a.sqDist - b.sqDist);

  return sqDists.slice(0, k);
};

export default { roundToNearest, retrieveKClosestMemories };
