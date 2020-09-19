const foo = new Promise((resolve, reject) => {
  if (true) {
    resolve(2);
  }
  resolve(42);
  // reject('oops');
});

foo
  .then((data) => console.log(data))
  .then(() => {
    console.log("1");
  })
  .then(() => {
    console.log("2");
  })
  .catch((err) => console.log("err", err))
  .then(() => {
    console.log("3");
  });

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise sleep");
      resolve();
    }, ms);
  });
};

const wakeUp = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise wake up");
      resolve();
    }, ms);
  });
};

Promise.all([sleep(8000), wakeUp(500)])
.then(() => {
  console.log("All promises")
})

Promise.race([sleep(8000), wakeUp(600)])
.then(() => {
  console.log("Race promises")
})
