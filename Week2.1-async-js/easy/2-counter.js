/**
 * Counter without setInterval
 *
 * Without using setInterval, try to code a counter in Javascript.
 */

let h = 0;
let m = 0;
let s = 0;

const timer = () => {
  s++;
  if (s == 60) {
    s = 0;
    m++;
  }
  if (m == 60) {
    m = 0;
    h++;
  }
  hStr = h < 10 ? "0" + h : h;
  mStr = m < 10 ? "0" + m : m;
  sStr = s < 10 ? "0" + s : s;
  console.log(hStr + ":" + mStr + ":" + sStr);
  setTimeout(timer, 1);
};

setTimeout(timer, 1000);
