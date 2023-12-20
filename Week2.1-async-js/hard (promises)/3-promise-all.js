/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
  const promise = new Promise(function (resolve) {
    setTimeout(resolve, t * 1000);
  });
  return promise;
}

function wait2(t) {
  const promise = new Promise(function (resolve) {
    setTimeout(resolve, t * 1000);
  });
  return promise;
}

function wait3(t) {
  const promise = new Promise(function (resolve) {
    setTimeout(resolve, t * 1000);
  });
  return promise;
}

function calculateTime(t1, t2, t3) {
  const startTime = new Date().getTime();
  return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(function (values) {
    const endTime = new Date().getTime();
    return endTime - startTime;
  });
}

async function main() {
  console.log(await calculateTime(1, 2, 3));
}

main();

module.exports = calculateTime;
