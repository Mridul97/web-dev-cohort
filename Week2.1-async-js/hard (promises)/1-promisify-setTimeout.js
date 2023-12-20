/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  const p = new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
  return p;
}

const p = wait(1).then(function () {
  console.log("done");
});

console.log(p);

async function main() {
  const t = await wait(1).then(function () {
    return 1;
  });
  console.log(t);
}

main();

module.exports = wait;
