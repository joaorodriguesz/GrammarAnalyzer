export class GrammarAnalyze {
    constructor(gramarInput, deriveButton, inputResult, randomDeriveButton) {
        this.gramarInput = gramarInput;
        this.deriveButton = deriveButton;
        this.inputResult = inputResult;
        this.randomDeriveButton = randomDeriveButton;
    }
    getGramarInput() {
        return this.gramarInput;
    }
    getInputResult() {
        return this.inputResult;
    }
    getDeriveButton() {
        return this.deriveButton;
    }
    getRandomDeriveButton() {
        return this.randomDeriveButton;
    }
}
