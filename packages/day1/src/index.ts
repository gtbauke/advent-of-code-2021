import { readFile } from 'fs/promises';

type Increase = 1;
type Decrease = -1;

type Change = Increase | Decrease;

const part1 = (input: number[]) => {
  const changes: Change[] = [];
  for (let i = 1; i < input.length; i++) {
    const prev = input[i - 1];
    const cur = input[i];

    changes.push(Math.sign(cur - prev) as Change);
  }

  const res = changes.filter(v => v > 0).length;
  console.log(res);
};

const part2 = (input: number[]) => {
  const changes: Change[] = [];
  for (let i = 3; i < input.length; i++) {
    const prevWindow = input.slice(i - 3, i);
    const currentWindow = input.slice(i - 2, i + 1);

    const prevSum = prevWindow.reduce((a, b) => a + b, 0);
    const currentSum = currentWindow.reduce((a, b) => a + b, 0);

    changes.push(Math.sign(currentSum - prevSum) as Change);
  }

  const res = changes.filter(v => v > 0).length;
  console.log(res);
};

const main = async () => {
  const input = await readFile('input.txt', { encoding: 'utf8' });
  const measurements = input
    .split('\n')
    .filter(s => s !== '')
    .map(s => Number(s.trim()));

  part1(measurements);
  part2(measurements);
};

main();
