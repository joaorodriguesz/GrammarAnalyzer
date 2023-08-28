import { GrammarAnalyze } from "../models/grammar-analyze.js";
import { Grammar } from "../utils/Grammar.js";

export class GrammarAnalyzeController {
    private gramarAnalizy: GrammarAnalyze;
    private grammar: Grammar;

    constructor(gramarInput: HTMLInputElement, deriveButton: HTMLButtonElement, inputResult: HTMLInputElement, randomDeriveButton: HTMLButtonElement){
        this.gramarAnalizy = new GrammarAnalyze(gramarInput, deriveButton, inputResult, randomDeriveButton);
    }
    
    onClickDeriveListner(){
        this.gramarAnalizy.getDeriveButton().addEventListener("click",()=>{
            let gramarAnalizyInputValue: string = this.gramarAnalizy.getGramarInput().value;
            let parseInput: Map<string, string[]> = this.parseGrammarString(gramarAnalizyInputValue);

            this.grammar = new Grammar(parseInput);

            this.gramarAnalizy.getInputResult().value = this.grammar.derive();        
        })
    }

    onClickRandomDeriveListner(){
        this.gramarAnalizy.getRandomDeriveButton().addEventListener("click",()=>{
            this.grammar = new Grammar();

            for (let index = 0; index < 3; index++) {
                let randomGrammar: Grammar = this.grammar.generateRandonGrammar(2);
            
                // Criação de elementos para exibir a gramática e o resultado
                const grammarElement = document.createElement('div');
                grammarElement.style.marginRight = '2rem';
                grammarElement.innerHTML =
                    `<b><i>G: </i></b>  ${randomGrammar.grammarMapToString()}
                     <br>
                     <b><i>RESULT: </i></b>  ${randomGrammar.derive()}`;
            
                // Anexando o novo elemento ao contêiner
                const randomListContainer = document.querySelector("#random-list");
                randomListContainer.appendChild(grammarElement);
            }
        })
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