import { GrammarAnalyze } from "../models/grammar-analyze.js";
import { Grammar } from "../utils/Grammar.js";
export class GrammarAnalyzeController {
    constructor(gramarInput, deriveButton, inputResult, randomDeriveButton) {
        this.gramarAnalizy = new GrammarAnalyze(gramarInput, deriveButton, inputResult, randomDeriveButton);
    }
    onClickDeriveListner() {
        this.gramarAnalizy.getDeriveButton().addEventListener("click", () => {
            try {
                let gramarAnalizyInputValue = this.gramarAnalizy.getGramarInput().value;
                let parseInput = this.parseGrammarString(gramarAnalizyInputValue);
                this.grammar = new Grammar(parseInput);
                this.gramarAnalizy.getInputResult().value = this.grammar.derive();
            }
            catch (error) {
                alert("Invalid format!");
            }
        });
    }
    onClickRandomDeriveListner() {
        const randomListContainer = document.querySelector("#random-list");
        this.grammar = new Grammar();
        this.gramarAnalizy.getRandomDeriveButton().addEventListener("click", () => {
            while (randomListContainer.firstChild) {
                randomListContainer.removeChild(randomListContainer.firstChild);
            }
            let exGrammars = [this.grammar.generateRandonGrammar(3), this.grammar.generateRandonGrammar(3), this.grammar.generateRandonGrammar(3)];
            exGrammars.forEach((randomGrammar) => {
                const grammarElement = document.createElement('div');
                grammarElement.innerHTML =
                    `<b><i>G: </i></b>  ${randomGrammar.grammarMapToString()}
                             <br>
                             <b><i>RESULT: </i></b>  ${randomGrammar.derive()}`;
                grammarElement.style.marginRight = '2rem';
                randomListContainer.appendChild(grammarElement);
            });
        });
    }
    parseGrammarString(grammar) {
        const rules = grammar.split(';').filter(Boolean);
        const grammarMap = new Map();
        rules.forEach(rule => {
            const [key, options] = rule.split(':=');
            if (key && options) {
                const optionsArray = options
                    .split('|')
                    .map(option => option.trim())
                    .filter(Boolean);
                grammarMap.set(key.trim(), optionsArray);
            }
        });
        return grammarMap;
    }
}
