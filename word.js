const Letter = require("./letter.js");

function Word(answer) {
    this.objArr = [];

    for (let i = 0; i < answer.length; i++) {
        let letter = new Letter(answer[i]);
        this.objArr.push(letter);
    }

    this.log = function () {
        let word = "";
        for (let i = 0; i < this.objArr.length; i++) {
            word += this.objArr[i] + " ";
        }
        console.log(word);
    };

    this.checkWord = function (input) {
        for (let i = 0; i < this.objArr.length; i++) {
            this.objArr[i].guess(input);
        }
    };
}

module.exports = Word;