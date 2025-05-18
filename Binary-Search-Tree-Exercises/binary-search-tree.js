class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    let currentNode = this.root;

    if (this.root === null || this.root.val === val) {
      this.root = newNode;
      return this;
    }

    while (currentNode !== null) {
      if (val < currentNode.val) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = newNode;
          currentNode = null;
        }
      } else if (val > currentNode.val) {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = newNode;
          currentNode = null;
        }
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    //checks for empty tree
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    //Helper function facilitating the recursive behavior and logic on each node
    function recurse(currentNode) {
      if (val < currentNode.val) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
        } else {
          recurse(currentNode.left);
        }
      } else if (val > currentNode.val) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
        } else {
          recurse(currentNode.right);
        }
      }
      return this; // Returns entire tree if a duplicate value is trying to be inserted
    }

    recurse(this.root); //Initiates recursive call on the root node
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;

    //Traverses tree until we reach value location
    while (currentNode) {
      if (currentNode.val === val) {
        return currentNode;
      } else {
        currentNode =
          val < currentNode.val ? currentNode.left : currentNode.right;
      }
    }
    //Returns undefined once the location of the node has been reached but is null.
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    let currentNode = this.root;

    //Helper function facilitating the recursive behavior and logic on each node
    function recurse(currentNode) {
      if (!currentNode || currentNode.val === val) {
        return currentNode;
      }
      if (val < currentNode.val) {
        currentNode = recurse(currentNode.left);
      } else if (val > currentNode.val) {
        currentNode = recurse(currentNode.right);
      }
      return currentNode;
    }

    currentNode = recurse(currentNode);
    return (currentNode = currentNode ?? undefined); //Sets currentNode to undefined if no value was found
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let currentNode = this.root;
    const visitedNodes = [];

    function traverse(currentNode) {
      visitedNodes.push(currentNode.val);
      if (currentNode.left) {
        traverse(currentNode.left);
      }
      if (currentNode.right) {
        traverse(currentNode.right);
      }
    }

    traverse(currentNode);
    return visitedNodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let currentNode = this.root;
    const visitedNodes = [];

    function traverse(currentNode) {
      if (currentNode.left) {
        traverse(currentNode.left);
      }
      visitedNodes.push(currentNode.val);
      if (currentNode.right) {
        traverse(currentNode.right);
      }
    }

    traverse(currentNode);
    return visitedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let currentNode = this.root;
    const visitedNodes = [];

    function traverse(currentNode) {
      if (currentNode.left) {
        traverse(currentNode.left);
      }
      if (currentNode.right) {
        traverse(currentNode.right);
      }
      visitedNodes.push(currentNode.val);
    }

    traverse(currentNode);
    return visitedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const nodesToVisit = [this.root];
    const visitedNodes = [];

    // Loop will check each node while the nodesToVisit list has a node
    // Adds each levels node to the visited nodes array from left to right as they appear.
    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.shift();

      if (currentNode !== null) {
        visitedNodes.push(currentNode.val);
        nodesToVisit.push(currentNode.left);
        nodesToVisit.push(currentNode.right);
      }
    }

    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let currentNode = this.root;
    let parentNode = null;

    // Traverse the tree to find the node
    while (currentNode) {
      if (currentNode.val === val) {
        // If the node has no children
        if (!currentNode.left && !currentNode.right) {
          // If the root is the only node
          if (!parentNode) {
            this.root = null;
          } else if (parentNode.left === currentNode) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        }

        // If the node has only one child
        else if (
          (currentNode.left && !currentNode.right) ||
          (!currentNode.left && currentNode.right)
        ) {
          //Assigns child the value of either left or right child.
          const child = currentNode.left ?? currentNode.right;

          // If removing the root with one child
          if (!parentNode) {
            this.root = child;
          } else if (parentNode.left === currentNode) {
            parentNode.left = child;
          } else {
            parentNode.right = child;
          }
        }

        //If the node has two children
        else {
          // Finds next in-order successor
          let successorParent = currentNode;
          let successor = currentNode.right;
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }

          // Replaces currentNode's value with successor's value
          currentNode.val = successor.val;

          // Recursively removes the successor node
          // Successor can only have a right child since it's the leftmost node in a subtree
          if (successorParent.left === successor) {
            successorParent.left = successor.right;
          } else {
            successorParent.right = successor.right;
          }
        }

        return currentNode;
      }

      // Traverses left or right
      parentNode = currentNode;
      currentNode =
        val < currentNode.val ? currentNode.left : currentNode.right;
    }

    //Returns undefined once the location of the node to remove has been reached but is null.
    return undefined;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    if (!this.root) {
      return false;
    }
    //Helper function that looks for the maxDepth of each subtree provided
    function findDepth(root) {
      if (!root) {
        return 0;
      }

      const nodesToVisit = [root];
      let currentMaxDepth = 0;
      let maxDepth = 0;

      // Loop will check each node while the nodesToVisit list has a node
      while (nodesToVisit.length) {
        let currentNode = nodesToVisit.pop();
        if (!currentNode.left && !currentNode.right) {
          currentMaxDepth++;
          if (maxDepth < currentMaxDepth) {
            maxDepth = currentMaxDepth;
          }
          currentMaxDepth--; // Decrements depth level since we will be backtracking to the previous node in the queue
        } else {
          if (currentNode.left) {
            nodesToVisit.push(currentNode.left);
          }
          if (currentNode.right) {
            nodesToVisit.push(currentNode.right);
          }
          currentMaxDepth++;
        }
      }
      return maxDepth;
    }

    const leftDepth = findDepth(this.root.left); //Find depth of left subtree
    const rightDepth = findDepth(this.root.right); // Find depth of right subtree

    return Math.abs(leftDepth - rightDepth) <= 1 ? true : false;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    //Empty tree or only a root
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let currentNode = this.root;
    let parentNode = null;

    //Moves to the farthest right node
    while (currentNode.right) {
      parentNode = currentNode;
      currentNode = currentNode.right;
    }
    //Checks if the farthest right node has a left child
    if (currentNode.left) {
      let secondHighest = currentNode.left;

      //Moves to the farthest right node if the left node has more right children
      while (secondHighest.right) {
        secondHighest = secondHighest.right;
      }
      return secondHighest.val;
    }
    return parentNode.val;
  }
}

module.exports = BinarySearchTree;
