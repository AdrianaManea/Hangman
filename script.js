const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

// Random word from our array
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
// sets the wordEl innerHTML 
// to whatever the selectedWord is, which is generated randomly from our 'words' array
// split() it into an array
// map() through it
// see's if there is a letter in the correctLetters array, if there is it's going to display it, if not it display's just an empty string
// we run join() to turn it back into a string

// then we check to see if wordEl.innerText matches the selecteWord
// if it does it means we've guessed the word and the popup displays

function displayWord() {
  // if the current letter we're looping through included in corectLetters
  // ? if so, show letter
  // : else empty string ''
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ?  letter : ''}
          </span>
        `
      ).join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  // console.log(wordEl.innerText, innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 🎉';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLettersEl() {

  // Display wrong letter
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost! 😟';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');

  }, 2000);
}


//Event Listeners

// Keydown letter press event handler
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // console.log(123);
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});


// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});


displayWord();