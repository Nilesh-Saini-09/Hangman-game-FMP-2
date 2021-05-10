const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'website', 'javascript', 'python', 'internet'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class='letter'>
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, "");
    
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won!!! 😀😀😀'
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    // We need to show the wrong letters we pressed
    // add the figure
    // check if the figure is complete and user lost the game

    wrongLettersEl.innerHTML =  `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost!!!';
        popup.style.display = 'flex';
    }
}

// Show Notification
function showNotifications(){
    // add/ remove the notification class using this function
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotifications();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotifications();
            }
        }
    }
});

displayWord();