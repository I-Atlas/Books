const foo = new Promise((resolve, reject) => {
  if (true) {
    resolve(2)
  }
  resolve(42);
  // reject('oops');
})

foo
  .then((data) => console.log(data))
  .then(() => { console.log('1'); })
  .then(() => { console.log('2'); })
  .catch(err => console.log('err',err))
  .then(() => { console.log('3'); })