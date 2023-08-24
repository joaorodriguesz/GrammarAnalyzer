import { Stack } from "./utils/Stack.js";

export class Grammar {
    private productions: Map<string, string[]>;
    private stack = new Stack<string>();

    constructor() {
        this.productions = new Map();
    }

    addProduction(nonTerminal: string, expansions: string[]) {
        if (!this.productions.has(nonTerminal)) {
            this.productions.set(nonTerminal, []);
        }
        this.productions.get(nonTerminal)?.push(...expansions);
    }

    derive(startSymbol: string) {
        let output: string = "";
        let startOptions: string[] = this.productions.get(startSymbol);
        let startOption: string = startOptions[Math.floor(Math.random() * startOptions.length)];

        this.stack.pushRest(...startOption.split('').reverse());
        
        while(!this.stack.isEmpty()){
            let key: string = this.stack.pop();
            if(this.productions.has(key)){
                let expansions: string[] = this.productions.get(key);
                let chosenExpansion: string = expansions[Math.floor(Math.random() * expansions.length)];

                this.stack.pushRest(...chosenExpansion.split('').reverse());
            } else {
                output += key;
            }
        }

        console.log(output);
    }
}