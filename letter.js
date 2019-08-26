var Letter = function (char) {
    this.letter = char;
    this.guessed = false;
    this.returnLetter = function () {
        if (this.guessed) {
            return this.letter;
        }
        else {
            return "_";
        }
    };
    this.guess = function (char) {
        if (char.toUpperCase() == this.letter.toUpperCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;