import { Stack } from "./utils/Stack.js";
import { UTILS } from "./utils/utilsConstants.js";

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

    derive(startSymbol: string): string {
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
        return output;
    }

    gerenateRandonGrammars(number: number){
        let grammar = new Grammar();
        let nonTerminal: string[];

        for (let i = 0; i < number; i++) {
            nonTerminal.push(UTILS.ALPHABET.UPPERCASE[i]);
        }
    }

    generateRandomOptions(number: number) {
        let randomOptions: string[] = [];

        for (let i = 0; i < number; i++) {
            const allChars: string = '0123456789abcdefghijklmnopqrstuvwxyz';
            const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
            let randomString: string = '';
        
            for (let i = 0; i < 2; i++) {
                const randomIndex: number = Math.floor(Math.random() * allChars.length);
                randomString += allChars[randomIndex];
            }
        
            if (Math.random() < 0.7) {
                const randomUppercaseIndex: number = Math.floor(Math.random() * uppercaseChars.length);
                randomString += uppercaseChars[randomUppercaseIndex];
            }

            randomOptions.push(randomString);
        }

        return randomOptions;
    }
}
