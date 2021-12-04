import { readFile } from 'fs/promises';

const filter = (
  arr: string[],
  position: number,
  returnMostCommon: boolean,
): number => {
  if (arr.length === 1) return parseInt(arr[0], 2);

  const zeroes = arr.filter(value => value[position] === '0');
  const ones = arr.filter(value => value[position] === '1');

  const useZeroes = zeroes.length > ones.length === returnMostCommon;
  return filter(useZeroes ? zeroes : ones, position + 1, returnMostCommon);
};

const part1 = (numbers: string[]): [sigma: string, epsolon: string] => {
  const size = numbers[0].length;

  const sigmaString: string[] = [];
  const epsolonString: string[] = [];
  for (let x = 0; x < size; x++) {
    let zeros = 0;
    let ones = 0;

    for (let y = 0; y < numbers.length; y++) {
      const number = numbers[y][x];

      if (number === '0') zeros++;
      if (number === '1') ones++;
    }

    sigmaString.push(zeros > ones ? '0' : '1');
    epsolonString.push(zeros < ones ? '0' : '1');
  }

  return [sigmaString.join(''), epsolonString.join('')];
};

const main = async () => {
  const input = await readFile('input.txt', { encoding: 'utf8' });
  const numbers = input.split('\n').filter(s => s !== '');

  const [sigmaString, epsolonString] = part1(numbers);

  const sigma = parseInt(sigmaString, 2);
  const epsolon = parseInt(epsolonString, 2);

  console.log(sigma * epsolon);

  const [o2, co2] = [filter(numbers, 0, true), filter(numbers, 0, false)];
  console.log(o2 * co2);
};

main();
