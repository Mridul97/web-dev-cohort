/*
Using 1-counter.md or 2-counter.md from the easy section, can you create a clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats -

HH:MM::SS (Eg. 13:45:23)

HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

setInterval(function () {
  let date = new Date().toLocaleTimeString();
  console.log(date);
  let hourStr = date.slice(0, 2);
  let suffix;
  if (hourStr > 12) {
    hourStr -= 12;
    suffix = " PM";
  } else {
    suffix = " AM";
  }
  const h2 = hourStr % 10;
  const h1 = hourStr / 10;

  let newdate = String(h1) + String(h2) + date.slice(2, date.length) + suffix;

  console.log(newdate);
}, 1000);
