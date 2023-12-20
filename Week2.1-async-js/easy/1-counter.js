/**
 * Create a counter in JavaScript
 * try to code a counter in Javascript
 * It should go up as time goes by in intervals of 1 second
 */

// Terminal clock (HH:MM:SS)

let h = 0;
let m = 0;
let s = 0;

setInterval(() => {
  s++;
  if (s == 60) {
    m += 1;
    s = 0;
  }
  if (m == 60) {
    h += 1;
    m = 0;
  }
  hStr = h < 10 ? "0" + h : h;
  mStr = m < 10 ? "0" + m : m;
  sStr = s < 10 ? "0" + s : s;
  console.log(hStr + ":" + mStr + ":" + sStr);
}, 1000);
