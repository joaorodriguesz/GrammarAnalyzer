# 📜 Grammatical Derivation Program in TypeScript

This is a TypeScript program that demonstrates a grammatical derivation algorithm. The program uses Node.js version 19.8.1 for execution. The `Grammar` class is utilized to work with grammatical derivations. 🚀

## 🏃‍♂️ How to Run

Follow the instructions below to run the program:

1. **Clone the repository to your local environment:**

   ```sh
   git clone https://github.com/joaorodriguesz/GrammarAnalyzer.git
   ```

1. **Navigate to the project directory:**

   ```
   cd your-repository
   ```

2. **Install the dependencies using npm:**

   ```
   npm install
   ```

3. **To execute the grammatical derivation algorithm, run the following command:**

   ```
   npm start
   ```

   The program will run, demonstrating the grammatical derivation as implemented in the `Grammar` class.

## 📚 Documentation

The `Grammar` class has the following methods:

- `addProduction(nonTerminal: string, expansions: string[]): void`: This method allows you to add productions to the grammar. You should provide the non-terminal symbol and an array with the substitution options.
- `derive(startSymbol: string): string`: This method executes the process of grammatical derivation. It takes the initial symbol for derivation and returns the result of the derivation.

## ⚠️ Notes

Make sure you have Node.js installed in version 19.8.1 or higher to run this program. Remember to adjust the repository cloning instructions if the repository is located in a different location. 📝