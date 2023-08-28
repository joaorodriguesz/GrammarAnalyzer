import { GrammarAnalyze } from "../models/grammar-analyze.js";
import { Grammar } from "../utils/Grammar.js";

export class GrammarAnalyzeController {
    private gramarAnalizy: GrammarAnalyze;
    private grammar: Grammar;

    constructor(gramarInput: HTMLInputElement, deriveButton: HTMLButtonElement, inputResult: HTMLInputElement, randomDeriveButton: HTMLButtonElement) {
        this.gramarAnalizy = new GrammarAnalyze(gramarInput, deriveButton, inputResult, randomDeriveButton);
    }

    onClickDeriveListner() {
        this.gramarAnalizy.getDeriveButton().addEventListener("click", () => {
            try {
                let gramarAnalizyInputValue: string = this.gramarAnalizy.getGramarInput().value;
                let parseInput: Map<string, string[]> = this.parseGrammarString(gramarAnalizyInputValue);

                this.grammar = new Grammar(parseInput);

                this.gramarAnalizy.getInputResult().value = this.grammar.derive();
            }
            catch (error) {
                alert("Invalid format!")
            }
        })
    }

    onClickRandomDeriveListner() {
        const randomListContainer = document.querySelector("#random-list");
        this.grammar = new Grammar();

        this.gramarAnalizy.getRandomDeriveButton().addEventListener("click", () => {

            while (randomListContainer.firstChild) {
                randomListContainer.removeChild(randomListContainer.firstChild);
            }

            let exGrammars = [this.grammar.generateRandonGrammar(3),  this.grammar.generateRandonGrammar(3),  this.grammar.generateRandonGrammar(3)]

            exGrammars.forEach((randomGrammar)=>{
                const grammarElement = document.createElement('div');
                grammarElement.innerHTML =
                    `<b><i>G: </i></b>  ${randomGrammar.grammarMapToString()}
                             <br>
                             <b><i>RESULT: </i></b>  ${randomGrammar.derive()}`;
                grammarElement.style.marginRight = '2rem';
    
                randomListContainer.appendChild(grammarElement);
            })


        });
    }

    private parseGrammarString(grammar: string): Map<string, string[]> {
        const rules = grammar.split(';').filter(Boolean);

        const grammarMap = new Map<string, string[]>();

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