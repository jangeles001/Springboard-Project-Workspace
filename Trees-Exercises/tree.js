/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) {
      return 0;
    }
    if (!this.root.children) {
      return this.root.val;
    }

    const nodesToAdd = [this.root];
    let sumOfValues = 0;

    while (nodesToAdd.length) {
      let currentNode = nodesToAdd.pop();
      sumOfValues += currentNode.val;
      for (const child of currentNode.children) {
        if (child.children.length) {
          //If the child node has children we push this child onto the stack
          nodesToAdd.push(child);
        } else {
          sumOfValues += child.val; // Otherwise we add the child value to the sum
        }
      }
    }
    return sumOfValues;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) {
      return 0;
    }
    if (!this.root.children) {
      return this.root.val;
    }

    const nodesToAdd = [this.root];
    let numOfEvens = 0;

    while (nodesToAdd.length) {
      let currentNode = nodesToAdd.pop();
      if (currentNode.val % 2 === 0) {
        numOfEvens++;
      }
      for (const child of currentNode.children) {
        if (child.children.length) {
          //If the child node has children we push this child onto the stack
          nodesToAdd.push(child);
        } else {
          //Otherwise we check if value is even
          if (child.val % 2 === 0) {
            numOfEvens++;
          }
        }
      }
    }
    return numOfEvens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }
    if (!this.root.children) {
      return this.root.val;
    }

    const nodesToAdd = [this.root];
    let greaterNodes = 0;

    while (nodesToAdd.length) {
      let currentNode = nodesToAdd.pop();
      if (currentNode.val > lowerBound) {
        greaterNodes++;
      }
      for (const child of currentNode.children) {
        if (child.children.length) {
          //If the child node has children we push this child onto the stack
          nodesToAdd.push(child);
        } else {
          if (child.val > lowerBound) {
            // Otherwise checks if value is greater than the lowerbound
            greaterNodes++;
          }
        }
      }
    }
    return greaterNodes;
  }
}

module.exports = { Tree, TreeNode };
