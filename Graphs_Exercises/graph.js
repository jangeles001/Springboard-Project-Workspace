class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (this.nodes.has(vertex)) {
      console.log(`${vertex} already exists`);
    } else {
      this.nodes.add(vertex);
    }
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const node of vertexArray) {
      if (this.nodes.has(node)) {
        console.log(`${node} already exists`);
      } else {
        this.nodes.add(node);
      }
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    //Iterates through the adjacent nodes set of other nodes and deletes
    for (const node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(node);
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const nodesToVisit = [start]; //Stack
    const nodesVisited = new Set([start]);
    const dfsArray = [];

    //Iterates though each node of the graph and adds the value to dfsArray
    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.pop();
      dfsArray.push(currentNode.value);
      if (currentNode.adjacent.size > 0) {
        //Checks if adjacent nodes exist
        for (const node of currentNode.adjacent) {
          if (!nodesVisited.has(node)) {
            nodesToVisit.push(node);
            nodesVisited.add(node);
          }
        }
      }
    }
    return dfsArray;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const nodesToVisit = [start]; // Queue
    const nodesVisited = new Set([start]);
    const bfsArray = [];

    //Iterates though each node of the graph and adds the value to bfsArray
    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.shift(); //
      bfsArray.push(currentNode.value);
      if (currentNode.adjacent.size > 0) {
        //Checks if any adjacent nodes exist
        for (const node of currentNode.adjacent) {
          if (!nodesVisited.has(node)) {
            nodesToVisit.push(node);
            nodesVisited.add(node);
          }
        }
      }
    }
    return bfsArray;
  }
}

module.exports = { Graph, Node };
