const fs = require('fs');

const source = 'dist/index.html';
const destination = 'dist/404.html';

fs.copyFile(source, destination, (err) => {
  if (err) throw err;
  console.log('index.html was copied to 404.html');
});