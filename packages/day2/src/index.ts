import { readFile } from 'fs/promises';

type Forward = 'forward';
type Down = 'down';
type Up = 'up';

type Direction = Forward | Down | Up;
type Instruction = [dir: Direction, value: number];

const part1 = (instructions: Instruction[]) => {
  const x = instructions
    .filter(([dir]) => dir === 'forward')
    .reduce((acc, [, value]) => acc + value, 0);

  const y = instructions
    .filter(([dir]) => dir !== 'forward')
    .reduce((acc, [dir, value]) => acc + (dir === 'up' ? -value : value), 0);

  console.log(x, y);
  console.log(x * y);
};

const part2 = (instructions: Instruction[]) => {
  let aim = 0;
  let depth = 0;
  let position = 0;

  for (let i = 0; i < instructions.length; i++) {
    const [dir, value] = instructions[i];

    if (dir !== 'forward') aim += dir === 'up' ? -value : value;
    else {
      position += value;
      depth += aim * value;
    }
  }

  console.log(position, depth);
  console.log(position * depth);
};

const main = async () => {
  const input = await readFile('input.txt', { encoding: 'utf8' });
  const instructions = input
    .split('\n')
    .filter(s => s !== '')
    .map(s => {
      const [dir, value] = s.split(' ');
      return [dir, Number(value)] as Instruction;
    });

  part1(instructions);
  part2(instructions);
};

main();
