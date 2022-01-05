const generateRandomString = function() {
  let num = Math.random();
  let str = num.toString(36);

  while(str.length < 8) {
    num = Math.random();
    str = num.toString(36);
  }

  return str.slice(2, 8);
}

module.exports = generateRandomString;