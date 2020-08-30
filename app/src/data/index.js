import data from './result.json';
import { computeScore, WHITE, BLACK } from '../utils';

const blackAverage = Object.entries(data[BLACK]['*']).reduce((acc, [elo, outcome]) => {
  return {
    ...acc,
    [elo]: computeScore(outcome),
  };
}, {});

const whiteAverage = Object.entries(data[WHITE]['*']).reduce((acc, [elo, outcome]) => {
  return {
    ...acc,
    [elo]: computeScore(outcome),
  };
}, {});

const blackTotal = Object.entries(data[BLACK]['*']).reduce((acc, [elo, outcome]) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  return acc + wins + losses + draws;
}, 0);

const whiteTotal = Object.entries(data[WHITE]['*']).reduce((acc, [elo, outcome]) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  return acc + wins + losses + draws;
}, 0);

if (whiteTotal !== blackTotal) {
  throw new Error('totals are not matching');
}

export { blackAverage, whiteAverage, data };
