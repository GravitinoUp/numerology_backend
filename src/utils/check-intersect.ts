export default function checkIntersects(y1, y2, y3, y4) {
  if ((y1 < y2 && y3 > y4) || (y1 > y2 && y3 < y4)) {
    return true
  } else {
    return false
  }
}
