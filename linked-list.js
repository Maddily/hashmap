import Node from './node.js';

export default class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(key, value = undefined) {
    const node = new Node();
    node.key = key;
    if (value) node.value = value;

    if (!this.headNode) {
      this.headNode = node;
    } else {
      let current = this.headNode;

      while (current.nextNode) {
        current = current.nextNode;
      }

      current.nextNode = node;
    }
  }

  size() {
    if (!this.headNode) {
      return 0;
    }

    let current = this.headNode;
    let listSize = 0;

    while (current) {
      listSize += 1;
      current = current.nextNode;
    }

    return listSize;
  }

  head() {
    return this.headNode;
  }

  at(index) {
    if (index < 0) {
      return null;
    }

    let currentIndex = 0;
    let current = this.headNode;

    while (currentIndex !== index && current !== null) {
      currentIndex += 1;
      current = current.nextNode;
    }

    return current;
  }

  removeAt(index) {
    if (!this.headNode) {
      return;
    }

    if (index === 0) {
      this.headNode = this.headNode.nextNode;
    }

    if (index > 0) {
      let currentIndex = 1;
      let previous = this.headNode;
      let current = previous.nextNode;

      while (current) {
        if (currentIndex === index) {
          previous.nextNode = current.nextNode;
          return;
        }

        currentIndex += 1;
        previous = previous.nextNode;
        current = current.nextNode;
      }

      // If currentIndex is 1, the loop didn't execute and there's only one node in the list
      if (currentIndex === 1 && index === 1) {
        this.headNode = null;
        // If we reached the end of the list and the given index is the tail node's index
      } else if (current && !current.nextNode && currentIndex === index) {
        previous.nextNode = null;
      }
    }
  }

  contains(key) {
    let current = this.headNode;

    while (current) {
      if (current.key === key) {
        return true;
      }

      current = current.nextNode;
    }

    return false;
  }

  find(key) {
    let current = this.headNode;
    let currentIndex = 0;

    while (current) {
      if (current.key === key) {
        return currentIndex;
      }

      currentIndex += 1;
      current = current.nextNode;
    }

    return null;
  }

  keys() {
    const allKeys = [];
    let current = this.headNode;

    while (current) {
      allKeys.push(current.key);
      current = current.nextNode;
    }

    return allKeys;
  }

  values() {
    const allValues = [];
    let current = this.headNode;

    while (current) {
      allValues.push(current.value);
      current = current.nextNode;
    }

    return allValues;
  }

  entries() {
    const allEntries = [];
    let current = this.headNode;

    while (current) {
      allEntries.push([current.key, current.value]);
      current = current.nextNode;
    }

    return allEntries;
  }

  toString() {
    let current = this.headNode;
    let string = '';

    while (current) {
      string = string.concat(`( ${current.value} ) -> `);
      current = current.nextNode;
    }

    string = string.concat('null');
    return string;
  }
}
