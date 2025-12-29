const words = [
    "ЛЕКЦІЯ", "ЕКЗАМЕН", "СТУДЕНТ", "ДИПЛОМ",
    "КАФЕДРА", "АУДИТОРІЯ", "ЛАБОРАТОРНА", "КОНСПЕКТ", 
    "ДЕКАНАТ", "СТИПЕНДІЯ", "УНІВЕРСИТЕТ",
];

const maxMistakes = 6;
let selectedWord = "";
let guessedLetters = [];
let mistakes = 0;

function initGame() {
    mistakes = 0;
    guessedLetters = [];
    document.getElementById('game-status').innerText = "";
    document.getElementById('game-status').style.color = "white";
    
    document.querySelectorAll('.figure-part').forEach(part => {
        part.style.display = 'none';
    });

    selectedWord = words[Math.floor(Math.random() * words.length)];

    generateKeyboard();
    updateWordDisplay();
}

function generateKeyboard() {
    const keyboardContainer = document.getElementById('keyboard');
    keyboardContainer.innerHTML = '';

    const alphabet = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";
    
    alphabet.split('').forEach(letter => {
        const btn = document.createElement('button');
        btn.innerText = letter;
        btn.classList.add('key-btn');
        btn.id = `btn-${letter}`;
        btn.onclick = () => handleGuess(letter);
        keyboardContainer.appendChild(btn);
    });
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    const displayArray = selectedWord.split('').map(letter => {
        return guessedLetters.includes(letter) ? letter : "_";
    });
    
    wordDisplay.innerText = displayArray.join(" ");
    checkWin(displayArray.join(""));
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || mistakes >= maxMistakes) return;

    guessedLetters.push(letter);
    const btn = document.getElementById(`btn-${letter}`);
    btn.disabled = true;

    if (selectedWord.includes(letter)) {
        btn.classList.add('correct');
        updateWordDisplay();
    } else {
        btn.classList.add('wrong');
        mistakes++;
        drawHangman();
        checkLoss();
    }
}

function drawHangman() {
    const part = document.getElementById(`part-${mistakes - 1}`);
    if (part) {
        part.style.display = 'block';
    }
}

function checkWin(currentWordState) {
    if (currentWordState === selectedWord) {
        document.getElementById('game-status').innerText = "Ви виграли!";
        document.getElementById('game-status').style.color = "#2ecc71";
        disableAllButtons();
    }
}

function checkLoss() {
    if (mistakes >= maxMistakes) {
        document.getElementById('game-status').innerText = `Ви програли! Слово було: ${selectedWord}`;
        document.getElementById('game-status').style.color = "#e74c3c";
        document.getElementById('word-display').innerText = selectedWord.split('').join(" ");
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(btn => btn.disabled = true);
}

window.onload = initGame;