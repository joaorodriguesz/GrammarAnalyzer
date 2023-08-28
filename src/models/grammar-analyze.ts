export class GrammarAnalyze {
    constructor(private gramarInput: HTMLInputElement, private deriveButton: HTMLButtonElement, private inputResult: HTMLInputElement, private randomDeriveButton: HTMLButtonElement) {

    }


    public getGramarInput(): HTMLInputElement {
        return this.gramarInput;
    }

    public getInputResult(): HTMLInputElement {
        return this.inputResult;
    }


    public getDeriveButton(): HTMLButtonElement {
        return this.deriveButton;
    }

    public getRandomDeriveButton(): HTMLButtonElement {
        return this.randomDeriveButton;
    }

}