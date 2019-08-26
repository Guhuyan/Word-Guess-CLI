var Letter = require("./letter");

var Word = function (word) {
    this.objs = [];
    this.word = [];
    this.createObjs = function () {
        for (i = 0; i < word.length; i++) {
            this.objs.push(new Letter(word.charAt(i)));
        };
    };
    this.pushToWord = function () {
        for (i = 0; i < this.objs.length; i++) {
            this.word.push(this.objs[i].returnLetter());
        }
    };
    this.checkWord = function (char) {
        for (i = 0; i < this.objs.length; i++) {
            this.objs[i].guess(char);
        }
    }
}

// Testing
var test = new Word("Hello");
test.createObjs();
test.checkWord("H");
test.checkWord("L");
test.checkWord("E");
console.log(JSON.stringify(test.objs));
test.pushToWord();
console.log(test.word.join(" "));

module.exports = Word;