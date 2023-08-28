import { GrammarAnalyzeController } from "./controllers/grammar-analyze.controller.js";
let gramarAnalizyController = new GrammarAnalyzeController(document.querySelector("#input-grammar"), document.querySelector("#btn-derive"), document.querySelector("#input-result"), document.querySelector("#btn-random-derive"));
gramarAnalizyController.onClickDeriveListner();
gramarAnalizyController.onClickRandomDeriveListner();
