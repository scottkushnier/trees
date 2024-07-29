/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  minDepth() {
    if (this.left && this.right) {
      return Math.min(this.left.minDepth(), this.right.minDepth()) + 1;
    } else if (this.left) {
      return this.left.minDepth() + 1;
    } else if (this.right) {
      return this.right.minDepth() + 1;
    } else return 1;
  }

  maxDepth() {
    if (this.left && this.right) {
      return Math.max(this.left.maxDepth(), this.right.maxDepth()) + 1;
    } else if (this.left) {
      return this.left.maxDepth() + 1;
    } else if (this.right) {
      return this.right.maxDepth() + 1;
    } else return 1;
  }

  maxSum() {
    // base case applies as leaf node, inductive case is leaf augmented by results from left & right subtrees
    // acc accumulates path sum through consecutive parents
    console.log("looking at node: ", this.val);
    let acc = this.val;
    // best keeps track of highest sum attainable in subtree at node
    let best = acc;
    let leftRes = { acc: 0, best: 0 };
    let rightRes = { acc: 0, best: 0 };
    if (this.left) {
      leftRes = this.left.maxSum();
    }
    if (this.right) {
      rightRes = this.right.maxSum();
    }
    console.log("leftRes: ", leftRes, "rightRes:", rightRes);
    // acc at node will be better of acc from right or left + val at this node
    acc += Math.max(leftRes.acc, rightRes.acc);
    // best is best from either right or left, or acc path from right or left,
    //   but a better path may go up to this node up left side, the down right side, check it too!
    best = Math.max(
      leftRes.best,
      rightRes.best,
      leftRes.acc,
      rightRes.acc,
      leftRes.acc + rightRes.acc + this.val
    );
    console.log("new acc: ", acc, "new best: ", best);
    return { acc, best };
  }

  nextLarger(lowerBound) {
    console.log("val: ", this.val);
    let minSoFar = null;
    if (this.val > lowerBound) {
      minSoFar = this.val;
    }
    if (this.left) {
      const leftMin = this.left.nextLarger(lowerBound);
      console.log("left min: ", leftMin);
      if (leftMin && leftMin < minSoFar) {
        minSoFar = leftMin;
      }
    }
    if (this.right) {
      const rightMin = this.right.nextLarger(lowerBound);
      console.log("right min: ", rightMin);
      if (rightMin && rightMin < minSoFar) {
        minSoFar = rightMin;
      }
    }
    return minSoFar;
  }

  areCousins(node1, node2) {
    console.log("val: ", this.val);
    if (
      this.left &&
      this.right &&
      ((this.left == node1 && this.right == node2) ||
        (this.left == node2 && this.right == node1))
    ) {
      return null;
    }
    let resLeft = [];
    let resRight = [];
    if (this.left) {
      resLeft = this.left.areCousins(node1, node2);
    }
    if (this.left) {
      resRight = this.right.areCousins(node1, node2);
    }
    let res;
    if (!resLeft) {
      res = resRight;
    } else {
      res = resLeft.concat(resRight);
    }
    if (this == node1 || this == node2) {
      res.push(0);
    }
    res = res.map((x) => x + 1);
    console.log("res: ", res);
    return res;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (this.root) {
      return this.root.minDepth();
    } else return 0;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (this.root) {
      return this.root.maxDepth();
    } else return 0;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (this.root) {
      const maxSumResult = this.root.maxSum();
      return Math.max(maxSumResult.acc, maxSumResult.best);
    } else return 0;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root) {
      return this.root.nextLarger(lowerBound);
    } else return null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const res = this.root.areCousins(node1, node2);
    console.log("res top level:", res);
    if (res && res.length == 2 && res[0] == res[1]) {
      return true;
    } else return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };

t = new BinaryTree();
t.root = new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(1));

t2 = new BinaryTree();
t2.root = new BinaryTreeNode(
  3,
  new BinaryTreeNode(2, new BinaryTreeNode(6), new BinaryTreeNode(4)),
  new BinaryTreeNode(-5, new BinaryTreeNode(3), new BinaryTreeNode(7))
);

t3 = new BinaryTree();
t3.root = new BinaryTreeNode(
  10,
  new BinaryTreeNode(2, null, new BinaryTreeNode(-4)),
  new BinaryTreeNode(-3, new BinaryTreeNode(8), new BinaryTreeNode(100))
);

let n7 = new BinaryTreeNode(7);
let n6 = new BinaryTreeNode(6);
let n5 = new BinaryTreeNode(5);
let n4 = new BinaryTreeNode(4);
let n3 = new BinaryTreeNode(3, n6, n7);
let n2 = new BinaryTreeNode(2, n4, n5);
let root = new BinaryTreeNode(1, n2, n3);
let tree = new BinaryTree(root);
