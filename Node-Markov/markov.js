/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (!chains[currentWord]) {
        chains[currentWord] = [];
      }
      chains[currentWord].push(nextWord);
    }
    return chains;
  }

  /** Return random text from chains */
  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let word = this.randomKey(keys);
    let result = [word];
    while (result.length < numWords && word !== null) {
      const nextWords = [...this.chains[word]];
      word = this.randomKey(nextWords);
      if (word !== null) result.push(word);
    }
    return result.join(" ");
  }

  // Helper function to get random key from chains
  randomKey(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

module.exports = MarkovMachine;
