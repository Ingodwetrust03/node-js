setTimeout(() => {
  process.nextTick(() => {
    console.log('На диване');
  });

  setTimeout(() => {
    console.log('Ехал слон.');
    setImmediate(() => {
      console.log('Кто не верит –');
    });

    setImmediate(() => {
      console.log('Выйди вон!');
    });
  }, 10);

  console.log('Был диван,');
}, 100);

process.nextTick(() => {
  console.log('Чемодан,');
});

setImmediate(() => {
  console.log('В чемодане');
});

console.log('Плыл по морю');
