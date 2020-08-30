const WHITE = 'white';
const BLACK = 'black';

const computeScore = (outcome) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  const score = (1 * wins + 0.5 * draws + 0 * losses) / (wins + draws + losses);
  return score;
};

export { WHITE, BLACK, computeScore };
