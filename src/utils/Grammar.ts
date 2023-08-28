import { Stack } from "../utils/Stack.js";
import { UTILS } from "../utils/utilsConstants.js";

export class Grammar {
    private productions: Map<string, string[]>;
    private stack = new Stack<string>();
    private readonly NON_TERMIAL_START = "S";

    constructor(productions: Map<string, string[]> = new Map()) {
        this.productions = productions;
    }

    addProduction(nonTerminal: string, expansions: string[]) {
        if (!this.productions.has(nonTerminal)) {
            this.productions.set(nonTerminal, []);
        }
        this.productions.get(nonTerminal)?.push(...expansions);
    }

    derive(): string {
        let output: string = "";
        let startOptions: string[] = this.productions.get(this.NON_TERMIAL_START);
        let startOption: string = startOptions[Math.floor(Math.random() * startOptions.length)];

        this.stack.pushRest(...startOption.split('').reverse());

        while (!this.stack.isEmpty()) {
            let key: string = this.stack.pop();
            if (this.productions.has(key)) {
                let expansions: string[] = this.productions.get(key);
                let chosenExpansion: string = expansions[Math.floor(Math.random() * expansions.length)];

                this.stack.pushRest(...chosenExpansion.split('').reverse());
            } else {
                output += key;
            }
        }

        return output;
    }

    generateRandonGrammar(nonTerminalQuality: number): Grammar {
        let randonGrammar = new Grammar();
        let nonTerminal: string[] = [];

        nonTerminal.push(this.NON_TERMIAL_START);

        for (let i = 0; i < (nonTerminalQuality - 1); i++) {
            nonTerminal.push(UTILS.ALPHABET.UPPERCASE[i]);
        }

        nonTerminal.forEach((nonTerminalChar) => {
            randonGrammar.addProduction(nonTerminalChar, this.generateRandonOptions(3, nonTerminal));
        })

        return randonGrammar;
    }

    private generateRandonOptions(optionsQuality: number, nonTerminals: string[]) {
        let randomOptions: string[] = [];


        for (let i = 0; i < optionsQuality; i++) {
            const terminals: string = 'abcdefghijklmnopqrstuvwxyz';

            let randomString: string = '';

            for (let i = 0; i < 2; i++) {
                const randomIndex: number = Math.floor(Math.random() * terminals.length);
                randomString += terminals[randomIndex];
            }

            if (Math.random() < 0.7) {
                const randomUppercaseIndex: number = Math.floor(Math.random() * nonTerminals.length);
                randomString += nonTerminals[randomUppercaseIndex];
            }
            randomOptions.push(randomString);
        }

        return randomOptions;
    }

    getProductions(): Map<string, string[]> {
        return this.productions;
    }

    grammarMapToString(): string {
        const rules: string[] = [];

        this.productions.forEach((optionsArray, key) => {
            const optionsString = optionsArray.join(' | ');
            rules.push(`<b>${key}:=</b> ${optionsString};`);
        });

        return rules.join(' ');
    }
}