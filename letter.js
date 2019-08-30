function Letter(value) {
    this.letter = value;
    this.guessed = false;

    this.toString = function () {
        if (this.letter === " ") {
            this.guessed = true;
            return " ";
        } else {
            if (this.guessed === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    };

    this.guess = function (char) {
        if (char.toUpperCase() === this.letter.toUpperCase()) {
            this.guessed = true;
        }
    };
}

module.exports = Letter;