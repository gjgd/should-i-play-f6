const WHITE = 'white';
const BLACK = 'black';

const computeScore = (outcome) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  const score = (1 * wins + 0.5 * draws + 0 * losses) / (wins + draws + losses);
  return score;
};

const computeNumberOfGames = (moveData) => {
  const numberOfGames = Object.values(moveData).reduce((acc, outcome) => {
    const wins = outcome['1'] || 0;
    const losses = outcome['0'] || 0;
    const draws = outcome['1/2'] || 0;
    return acc + wins + losses + draws;
  }, 0);

  return numberOfGames;
};

const updateQueryParameter = (key, value) => {
  const newUrl = new URLSearchParams(window.location.search);
  if (newUrl.get(key) !== value) {
    newUrl.set(key, value);
    window.history.pushState(null, '', `/?${newUrl.toString()}`);
  }
};

const getQueryParameter = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

export {
  WHITE,
  BLACK,
  computeScore,
  computeNumberOfGames,
  updateQueryParameter,
  getQueryParameter,
};
