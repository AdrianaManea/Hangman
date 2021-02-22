const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letter');
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
function updateWrondLettersEl() {
  console.log('Update wrong');
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');

  }, 2000);
}

// Keydown letter press event handler
// fire off when we hit a letter
// letter from a to z = 65 to 90
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

        updateWrondLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();