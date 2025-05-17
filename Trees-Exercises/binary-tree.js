/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      // returns 0 if tree is empty
      return 0;
    }
    if (!this.root.left && !this.root.right) {
      return 0;
    }

    const nodesToVisit = [this.root];
    let minDepth = 0;

    // Loop will check each node while the nodesToVisit list has a node
    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.shift();
      if (!currentNode.left && !currentNode.right) {
        minDepth++;
        return minDepth; // retruns first leaf found
      }

      if (currentNode.left) {
        nodesToVisit.push(currentNode.left);
      }
      if (currentNode.right) {
        nodesToVisit.push(currentNode.right);
      }
      minDepth++;
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0;
    }
    if (!this.root.left && !this.root.right) {
      return 0;
    }

    const nodesToVisit = [this.root];
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
        currentMaxDepth--; // decrements depth level since we will be backtracking to the previous node in the queue
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

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) {
      return 0;
    }
    if (!this.root.left && !this.root.right) {
      return 0;
    }

    let max = 0;
    let nodesToVisit = [this.root];
    let gainPerNode = new Map(); // Map to store node and value pair.
    let visited = new Set(); // Set to keep track of visited nodes.

    while (nodesToVisit.length) {
      let node = nodesToVisit[nodesToVisit.length - 1]; // reference to top node of the nodesToVisit.

      //Checks if node is a leaf or its children have been processed
      const leftDone = !node.left || visited.has(node.left);
      const rightDone = !node.right || visited.has(node.right);

      if (leftDone && rightDone) {
        nodesToVisit.pop(); // fully process this node by removing it from the nodesToVisit

        //Calculates the amount to be gained from left and right node
        let leftNodeGain = Math.max(0, gainPerNode.get(node.left) ?? 0);
        let rightNodeGain = Math.max(0, gainPerNode.get(node.right) ?? 0);

        // Calculates the value of the path through current node
        let currentMaxPath = leftNodeGain + node.val + rightNodeGain;
        max = Math.max(max, currentMaxPath);

        // Stores max gain amount in map as node,value pair. The greater of the left and right values is added to the map
        gainPerNode.set(node, node.val + Math.max(leftNodeGain, rightNodeGain));

        //Stores visited node in the set of visited nodes
        visited.add(node);
      } else {
        // Pushes children to nodesToVisit if not visited
        if (node.right && !visited.has(node.right)) {
          nodesToVisit.push(node.right);
        }
        if (node.left && !visited.has(node.left)) {
          nodesToVisit.push(node.left);
        }
      }
    }

    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    const nodesToVisit = [this.root];
    let currentLowestValue = null;

    // Loop will check each node while the nodesToVisit list has a node
    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.pop();

      //Checks if a new largest value has been found that meets lower bound constraint
      if (
        lowerBound < currentNode.val &&
        (currentLowestValue === null || currentNode.val < currentLowestValue)
      ) {
        currentLowestValue = currentNode.val;
      }
      if (currentNode.left) {
        nodesToVisit.push(currentNode.left);
      }
      if (currentNode.right) {
        nodesToVisit.push(currentNode.right);
      }
    }
    return currentLowestValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === node2) return false;

    const nodeParent = [[this.root, null]]; // Stores node, parent pair in queue

    while (nodeParent.length) {
      const levelSize = nodeParent.length;
      let node1Info = null;
      let node2Info = null;

      for (let i = 0; i < levelSize; i++) {
        const [node, parent] = nodeParent.shift();

        //If either of the nodes are found, we store the parent
        if (node === node1) node1Info = parent;
        if (node === node2) node2Info = parent;

        //Pushes next node along with parent to nodeParent queue
        if (node.left) nodeParent.push([node.left, node]);
        if (node.right) nodeParent.push([node.right, node]);
      }

      // After processing each level we check if node info exists for both nodes
      if (node1Info && node2Info) {
        return node1Info !== node2Info; // Returns true if same level, but different parents
      }

      //Checks if only one node was found this level but not the other
      if ((node1Info && !node2Info) || (!node1Info && node2Info)) {
        return false;
      }
    }

    return false; // Not found at same level
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(myTree) {
    const nodesToVisit = [myTree.root];
    let serializedTree = "";

    // Loop will check each node while the nodesToVisit list has a node
    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.shift();

      if (currentNode === null) {
        serializedTree = serializedTree.concat(`null,`); //Adds nulls to serialization when found
      } else {
        serializedTree = serializedTree.concat(
          `${currentNode.val.toString()},`
        );

        nodesToVisit.push(currentNode.left);
        nodesToVisit.push(currentNode.right);
      }
    }

    return serializedTree.substring(0, serializedTree.length - 1);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  //ex. [1,2,3,null,null,4,5,null,null,null,null]

  static deserialize(serializedTree) {
    const newTree = new BinaryTree();
    const treeValues = serializedTree.split(`,`); // Generates array out of serialized tree
    newTree.root = new BinaryTreeNode(parseInt(treeValues.shift()));
    const nodesToVisit = [newTree.root];

    /**
     * Goes through the treeValues array until no more values exist while populating tree.
     * Since the serialized tree contains null values for empty children,
     * we will always have a left and right child value to pull from the tree for each node.
     */

    while (treeValues.length) {
      let currentParent = nodesToVisit.shift();
      const leftChild = treeValues.shift();
      const rightChild = treeValues.shift();

      if (leftChild !== "null") {
        let newNode = new BinaryTreeNode(parseInt(leftChild));
        nodesToVisit.push(newNode);
        currentParent.left = newNode;
      }
      if (rightChild !== "null") {
        let newNode = new BinaryTreeNode(parseInt(rightChild));
        nodesToVisit.push(newNode);
        currentParent.right = newNode;
      }
    }
    return newTree;
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (
      this.root === null ||
      node1 === this.root ||
      node2 === this.root ||
      node1 === node2
    ) {
      return this.root;
    }

    const parent = new Map(); // [node, parent]
    const stack = [this.root];
    parent.set(this.root, null);

    // Iterates throough tree until both nodes are found
    while (!parent.has(node1) || !parent.has(node2)) {
      const currentNode = stack.pop();

      //Adds node, parent pair to parent map
      if (currentNode.left) {
        parent.set(currentNode.left, currentNode);
        stack.push(currentNode.left);
      }

      if (currentNode.right) {
        parent.set(currentNode.right, currentNode);
        stack.push(currentNode.right);
      }
    }

    // Creates Ancestors set for node1 and populates the set by iterating through
    const ancestors = new Set();
    while (node1) {
      ancestors.add(node1);
      node1 = parent.get(node1);
    }

    // Traverse node2's ancestry until the last common ancestor is found
    while (!ancestors.has(node2)) {
      node2 = parent.get(node2);
    }
    return node2;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
