'use strict';

class BST {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (!this.key) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key > this.key && this.left) {
      this.left.find(key);
    } else if (key < this.key && this.right) {
      this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const candidate = this.right._findMin();
        this.key = candidate.key;
        this.value = candidate.value;
        candidate.remove(candidate.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key > this.key && this.left) {
      this.left.remove(key);
    } else if (key < this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}


function main() {
  let bst = new BST();
  bst.insert(3, 3);
  bst.insert(1, 1);
  bst.insert(4, 4);
  bst.insert(6, 6);
  bst.insert(9, 9);
  bst.insert(2, 2);
  bst.insert(5, 5);
  bst.insert(7, 7);
  // console.log(bst);
  console.log(height(bst));
  console.log(isBST(bst));
}

main();

function height(node, count=1) {
  if (!node.left && !node.right) {
    return count;
  } else if (node.left && node.right) {
    const left = height(node.left, count + 1);
    const right = height(node.right, count + 1);
    return left > right ? left : right;
  } else if (node.left) {
    return height(node.left, count + 1);
  } else {
    return height(node.right, count + 1);
  }
}

function isBST(node, min=Number.NEGATIVE_INFINITY, max=Number.POSITIVE_INFINITY) {
  if (!node) return true;
  if (node.value < min || node.value > max) return false;
  return (isBST(node.left, min, node.value - 1) && isBST(node.right, node.value + 1, max));
}