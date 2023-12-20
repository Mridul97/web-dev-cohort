function myOwnSetTimeout(duration) {
  let p = new Promise((resolve) => {
    console.log(2);
    setTimeout(resolve, duration);
    console.log(3);
  });

  return p;
}

let obj = myOwnSetTimeout(1000);

console.log(1);

console.log(obj);
obj.then(() => {
  console.log("log the first thing");
  console.log(obj);
});

console.log(obj);
