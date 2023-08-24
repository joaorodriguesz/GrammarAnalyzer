import { Grammar } from "./Grammar.js";

let grammar = new Grammar();

// grammar.addProduction("S", ["aSb", "ab"]);
// grammar.derive("S");
console.log(grammar.generateRandomOptions(3));