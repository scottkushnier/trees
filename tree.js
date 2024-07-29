/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  sumValues() {
    let acc = this.val;
    if (this.children) {
      for (let child of this.children) {
        acc += child.sumValues();
      }
    }
    return acc;
  }

  countEvens() {
    let acc = this.val % 2 ? 0 : 1;
    if (this.children) {
      for (let child of this.children) {
        acc += child.countEvens();
      }
    }
    return acc;
  }

  numGreater(lowerBound) {
    let acc = this.val > lowerBound ? 1 : 0;
    if (this.children) {
      for (let child of this.children) {
        acc += child.numGreater(lowerBound);
      }
    }
    return acc;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (this.root) {
      return this.root.sumValues();
    } else return 0;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (this.root) {
      return this.root.countEvens();
    } else return 0;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (this.root) {
      return this.root.numGreater(lowerBound);
    } else return 0;
  }
}

module.exports = { Tree, TreeNode };

t = new Tree();
t.root = new TreeNode(4, [new TreeNode(5), new TreeNode(1), new TreeNode(6)]);
