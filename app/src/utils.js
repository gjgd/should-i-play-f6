import ReactGA from 'react-ga';

const WHITE = 'white';
const BLACK = 'black';

const computeScore = (outcome, gamePeriods = { A: true }) => {
  let wins = 0;
  let losses = 0;
  let draws = 0;
  Object.entries(outcome).forEach(([gamePeriod, scores]) => {
    if (gamePeriods[gamePeriod]) {
      wins += scores['1'] || 0;
      losses += scores['0'] || 0;
      draws += scores['1/2'] || 0;
    }
  });
  const score = (1 * wins + 0.5 * draws + 0 * losses) / (wins + draws + losses);
  return score;
};

const computeNumberOfGames = (moveData, gamePeriods) => {
  const numberOfGames = Object.values(moveData).reduce((acc, outcome) => {
    let wins = 0;
    let losses = 0;
    let draws = 0;
    Object.entries(outcome).forEach(([gamePeriod, scores]) => {
      if (gamePeriods[gamePeriod]) {
        wins += scores['1'] || 0;
        losses += scores['0'] || 0;
        draws += scores['1/2'] || 0;
      }
    });
    return acc + wins + losses + draws;
  }, 0);

  return numberOfGames;
};

const updateQueryParameter = (key, value) => {
  const newUrl = new URLSearchParams(window.location.search);
  if (newUrl.get(key) !== value) {
    newUrl.set(key, value);
    const newPage = `/?${newUrl.toString()}`;
    ReactGA.event({
      category: 'User',
      action: newPage
    });
    window.history.pushState(null, '', newPage);
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
