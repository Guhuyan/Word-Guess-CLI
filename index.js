var Word = require("./word.js");
var inquirer = require("inquirer");

var alphabetOnlyArr = "abcdefghijklmnopqrstuvwxyz";
var capAlphabetOnlyArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var myWordsArr = ["Angular", "Bootstrap", "Express", "Firebase", "Javascript", "jQuery", "MongoDB", "mySQL", "Node", "React"];

var randomIndex = Math.floor(Math.random() * myWordsArr.length);
var randomWord = myWordsArr[randomIndex];
var genWord = new Word(randomWord);
var nextWord = false;

var wrongLetters = [];
var correctLetters = [];
var remainingGuesses = 7;

function randomizer() {
    randomIndex = Math.floor(Math.random() * myWordsArr.length);
    randomWord = myWordsArr[randomIndex];
    genWord = new Word(randomWord);
    nextWord = false;
}

function reset() {
    nextWord = true;
    wrongLetters = [];
    correctLetters = [];
    remainingGuesses = 7;
}

function promptLog() {
    console.log("Can you guess what this word is?\n");
    genWord.log();
    console.log("\nPress a key to get started: ");
}

function guessGame() {
    if (nextWord) {
        randomizer();
    }

    let displayWord = [];
    genWord.objArr.forEach(completeCheck);

    if (displayWord.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "",
                    name: "Input"
                }
            ])
            .then(function (input) {
                if (!alphabetOnlyArr.includes(input.Input) || input.Input.length > 1 || capAlphabetOnlyArr.includes(input.Input)) {
                    console.log("Please enter a valid input: ");
                    guessGame();
                } else {
                    if (wrongLetters.includes(input.Input) || correctLetters.includes(input.Input)) {
                        console.log(`
The letter you entered has already been guessed.
Please enter another letter: 
                        `);
                        guessGame();
                    } else if (input.Input === "") {
                        console.log("Please enter a letter: ");
                    } else {
                        let checkWordArr = [];

                        genWord.checkWord(input.Input);

                        genWord.objArr.forEach(wordCheck);
                        if (checkWordArr.join("") === displayWord.join("")) {
                            wrongLetters.push(input.Input);
                            remainingGuesses--;
                        } else {
                            correctLetters.push(input.Input);
                        }

                        genWord.log();

                        console.log(`
You have ${remainingGuesses} guesses left.
The following letters have been guessed: 
${wrongLetters.join(" ")}
                        `);

                        if (remainingGuesses > 0) {
                            guessGame();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            checkWordArr.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log(`
You have completed the word! Win++
Would you like to play again?
        `);

        restartGame();
    }

    function completeCheck(key) {
        displayWord.push(key.guessed);
    }
}

// Restarts the game
function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Please select one: ",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                reset();
                randomizer();
                promptLog()
                guessGame();
            } else {
                return;
            }
        });
}

// Starts the game
promptLog()
guessGame();