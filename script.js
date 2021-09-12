'use strict';

// Selecting Elements

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting Conditions

let activePlayer, currentScore, scores, playing;

const init = function () {
  current0.textContent = 0;
  current1.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  diceEl.classList.add('hidden');

  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Changing css
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

// Click functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying Image
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //Checking for 1

    if (dice !== 1) {
      //if it is not 1
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Player wins
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//Reset functionality

btnNew.addEventListener('click', init);
