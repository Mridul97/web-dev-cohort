function myOwnSetTimeout(duration) {
  let p = new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

  return p;
}

async function main() {
  console.log("before");
  await myOwnSetTimeout(1000);
  console.log("after");
}

main();
