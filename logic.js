let answer = '';
let answerState = [];
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
    mistakesCount = 0;
    setDefaultKeyboard();
    drawPerson(mistakesCount)
    generateWord();
}

function generateWord() {
    answer = dictionary[Math.floor(Math.random() * dictionary.length)];
    answerState = [];

    for (let i = 0; i < answer.length; i += 1) {
        answerState.push('*');
    };

    drawAnswerState(answerState);
}

function onKeyClick(letter) {
    let objKey;

    if (mistakesCount === 7) {
        alert('Конец игры. Правильный ответ: ' + answer);
        startGame();
        return;
    };

    for (let i = 0; i <= lettersState.length; i++) {
        if (lettersState[i].char === letter) {
            objKey = lettersState[i];
            break;
        }
    }

    if (!answer.includes(objKey.char) && !objKey.error) {
        mistakesCount += 1;
        objKey.error = true;
        drawPerson(mistakesCount);
    };

    if (answer.includes(objKey.char) && !objKey.success) {
        objKey.success = true;
        for (let i = 0; i < answer.length; i++){
            if (answer[i] === objKey.char) {
                answerState[i] = objKey.char;
            }
        }
    };

    drawBoard(lettersState);

    drawAnswerState(answerState);

    if (answerState.join('') === answer) {
        winGame();
    }
}