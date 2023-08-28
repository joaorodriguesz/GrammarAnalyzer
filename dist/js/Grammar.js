import { Stack } from "./utils/Stack.js";
import { UTILS } from "./utils/utilsConstants.js";
export class Grammar {
    constructor() {
        this.stack = new Stack();
        this.productions = new Map();
    }
    addProduction(nonTerminal, expansions) {
        var _a;
        if (!this.productions.has(nonTerminal)) {
            this.productions.set(nonTerminal, []);
        }
        (_a = this.productions.get(nonTerminal)) === null || _a === void 0 ? void 0 : _a.push(...expansions);
    }
    derive(startSymbol) {
        let output = "";
        let startOptions = this.productions.get(startSymbol);
        let startOption = startOptions[Math.floor(Math.random() * startOptions.length)];
        this.stack.pushRest(...startOption.split('').reverse());
        while (!this.stack.isEmpty()) {
            let key = this.stack.pop();
            if (this.productions.has(key)) {
                let expansions = this.productions.get(key);
                let chosenExpansion = expansions[Math.floor(Math.random() * expansions.length)];
                this.stack.pushRest(...chosenExpansion.split('').reverse());
            }
            else {
                output += key;
            }
        }
        console.log(output);
        return output;
    }
    gerenateRandonGrammars(number) {
        let grammar = new Grammar();
        let nonTerminal;
        for (let i = 0; i < number; i++) {
            nonTerminal.push(UTILS.ALPHABET.UPPERCASE[i]);
        }
    }
    generateRandomOptions(number) {
        let randomOptions = [];
        for (let i = 0; i < number; i++) {
            const allChars = '0123456789abcdefghijklmnopqrstuvwxyz';
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let randomString = '';
            for (let i = 0; i < 2; i++) {
                const randomIndex = Math.floor(Math.random() * allChars.length);
                randomString += allChars[randomIndex];
            }
            if (Math.random() < 0.7) {
                const randomUppercaseIndex = Math.floor(Math.random() * uppercaseChars.length);
                randomString += uppercaseChars[randomUppercaseIndex];
            }
            randomOptions.push(randomString);
        }
        return randomOptions;
    }
}
