import { Stack } from "../utils/Stack.js";
import { UTILS } from "../utils/utilsConstants.js";
export class Grammar {
    constructor(productions = new Map()) {
        this.stack = new Stack();
        this.NON_TERMIAL_START = "S";
        this.productions = productions;
    }
    addProduction(nonTerminal, expansions) {
        var _a;
        if (!this.productions.has(nonTerminal)) {
            this.productions.set(nonTerminal, []);
        }
        (_a = this.productions.get(nonTerminal)) === null || _a === void 0 ? void 0 : _a.push(...expansions);
    }
    derive() {
        let output = "";
        let startOptions = this.productions.get(this.NON_TERMIAL_START);
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
        return output;
    }
    generateRandonGrammar(nonTerminalQuality) {
        let randonGrammar = new Grammar();
        let nonTerminal = [];
        nonTerminal.push(this.NON_TERMIAL_START);
        for (let i = 0; i < (nonTerminalQuality - 1); i++) {
            nonTerminal.push(UTILS.ALPHABET.UPPERCASE[i]);
        }
        nonTerminal.forEach((nonTerminalChar) => {
            randonGrammar.addProduction(nonTerminalChar, this.generateRandonOptions(3, nonTerminal));
        });
        return randonGrammar;
    }
    generateRandonOptions(optionsQuality, nonTerminals) {
        let randomOptions = [];
        for (let i = 0; i < optionsQuality; i++) {
            const terminals = 'abcdefghijklmnopqrstuvwxyz';
            let randomString = '';
            for (let i = 0; i < 2; i++) {
                const randomIndex = Math.floor(Math.random() * terminals.length);
                randomString += terminals[randomIndex];
            }
            if (Math.random() < 0.7) {
                const randomUppercaseIndex = Math.floor(Math.random() * nonTerminals.length);
                randomString += nonTerminals[randomUppercaseIndex];
            }
            randomOptions.push(randomString);
        }
        return randomOptions;
    }
    getProductions() {
        return this.productions;
    }
    grammarMapToString() {
        const rules = [];
        this.productions.forEach((optionsArray, key) => {
            const optionsString = optionsArray.join(' | ');
            rules.push(`<b>${key}:=</b> ${optionsString};`);
        });
        return rules.join(' ');
    }
}
