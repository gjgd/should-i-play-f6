import data from './remote-80000000.json';
import { computeScore, WHITE, BLACK } from '../utils';

const blackMoves = Object.keys(data[BLACK]);
const whiteMoves = Object.keys(data[WHITE]);

const blackAverage = Object.entries(data[BLACK]['*']).reduce(
  (acc, [elo, outcome]) => {
    return {
      ...acc,
      [elo]: computeScore(outcome),
    };
  },
  {},
);

const whiteAverage = Object.entries(data[WHITE]['*']).reduce(
  (acc, [elo, outcome]) => {
    return {
      ...acc,
      [elo]: computeScore(outcome),
    };
  },
  {},
);

const blackTotal = Object.entries(data[BLACK]['*']).reduce(
  (acc, [elo, outcome]) => {
    const wins = outcome['A']['1'] || 0;
    const losses = outcome['A']['0'] || 0;
    const draws = outcome['A']['1/2'] || 0;
    return acc + wins + losses + draws;
  },
  0,
);

const whiteTotal = Object.entries(data[WHITE]['*']).reduce(
  (acc, [elo, outcome]) => {
    const wins = outcome['A']['1'] || 0;
    const losses = outcome['A']['0'] || 0;
    const draws = outcome['A']['1/2'] || 0;
    return acc + wins + losses + draws;
  },
  0,
);

if (whiteTotal !== blackTotal) {
  throw new Error('totals are not matching');
}

export {
  blackAverage,
  whiteAverage,
  data,
  blackTotal,
  whiteTotal,
  blackMoves,
  whiteMoves,
};
