const MarkovMachine = require("./markov");

describe("MarkovMachine", () => {
  test("creates correct chains for a simple text", () => {
    const mm = new MarkovMachine("the cat in the hat");

    // Ensure the structure of the chains is correct.
    expect(mm.chains).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null],
    });
  });
  test("makeText returns a string of words from chains", () => {
    const mm = new MarkovMachine("the cat in the hat");
    const text = mm.makeText(10);

    // Ensure it's a string
    expect(typeof text).toBe("string");

    // Ensure all words are from the chain
    const words = text.split(" ");
    words.forEach((word) => {
      expect(Object.keys(mm.chains)).toContain(word);
    });
  });
});
