try {
  const { User } = await import('./modules/main.mjs');
  const newUser = new User('Svet Biryyu', '03.08.1987', 'carrer');
  console.log(newUser);
} catch (err) {
  console.log(err);
}
