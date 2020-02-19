export function calculateHelper(inputNum) {
    const reg = /[+-/x]/g;
    const signs = inputNum.match(reg);
    const numbers = inputNum.split(reg);

    return numbers.reduce((acc, num, i) => {
      if (i === 0) {
        acc += Number(num);
      }
      else if (signs[0] === '+') {
          acc += Number(num);
          signs.shift();
        }
        else if (signs[0] === '-') {
          acc -= Number(num);
          signs.shift();
        }
        else if (signs[0] === 'x') {
          acc *= Number(num);
          signs.shift();
        }
        else if (signs[0] === '/') {
          acc /= Number(num);
          signs.shift();
        }
      return acc;
    }, 0);
}