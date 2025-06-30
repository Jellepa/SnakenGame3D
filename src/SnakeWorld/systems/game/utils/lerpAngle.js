// Utility function for circular (angular) interpolation
// Handles wraparound at -PI and +PI to ensure shortest rotation path
function lerpAngle(from, to, t) {
  let difference = to - from;

  // Ensure we take the shorter path around the circle
  if (difference > Math.PI) {
    difference -= 2 * Math.PI;
  } else if (difference < -Math.PI) {
    difference += 2 * Math.PI;
  }

  return from + difference * t;
}

export { lerpAngle };
