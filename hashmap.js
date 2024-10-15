import LinkedList from './linked-list.js';

export default class HashMap {
  constructor() {
    this.size = 16;
    this.loadFactor = 0.75;
    this.buckets = [...Array(this.size)].fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    return hashCode;
  }

  validateHashCode(hashCode) {
    if (hashCode < 0 || hashCode >= this.size) {
      throw new Error('Trying to access index out of bound');
    }
  }

  set(key, value) {
    const hashCode = this.hash(key);

    this.validateHashCode(hashCode);

    if (this.buckets[hashCode] === null) {
      this.buckets[hashCode] = new LinkedList();
    }

    // If the key exists, overwrite its value
    const existingNodeIndex = this.buckets[hashCode].find(key);
    if (existingNodeIndex !== null) {
      let currentIndex = 0;
      let current = this.buckets[hashCode].head();

      while (currentIndex !== existingNodeIndex && current !== null) {
        currentIndex += 1;
        current = current.nextNode;
      }

      if (current) {
        current.value = value;
      }
    } else {
      // The key doesn't exist. Hence, append it
      this.buckets[hashCode].append(key, value);
    }

    /**
     * If the number of keys is higher than the hashmap's capacity
     * multiplied by the load factor, double the size of the hash map
     */
    if (this.length() > this.size * this.loadFactor) {
      // copy all nodes using entries method that returns an array of all entries
      const entries = this.entries();

      this.size *= 2;

      this.buckets = [...Array(this.size)].fill(null);

      for (let i = 0; i < entries.length; i++) {
        this.set(...entries[i]);
      }
    }
  }

  get(key) {
    const hashCode = this.hash(key);

    this.validateHashCode(hashCode);

    if (this.buckets[hashCode] === null) {
      return null;
    }

    const index = this.buckets[hashCode].find(key);
    if (index === null) {
      return null;
    }

    const value = this.buckets[hashCode].at(index).value;

    return value;
  }

  has(key) {
    const hashCode = this.hash(key);

    this.validateHashCode(hashCode);

    if (this.buckets[hashCode] === null) {
      return false;
    }

    return this.buckets[hashCode].contains(key);
  }

  remove(key) {
    const hashCode = this.hash(key);

    this.validateHashCode(hashCode);

    if (this.buckets[hashCode] === null) {
      return false;
    }

    const index = this.buckets[hashCode].find(key);
    if (index === null) {
      return false;
    }

    this.buckets[hashCode].removeAt(index);

    // If the linked list is now empty, delete it.
    if (this.buckets[hashCode].head() === null) {
      this.buckets[hashCode] = null;
    }

    return true;
  }

  length() {
    let totalKeys = 0;

    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i] !== null) {
        totalKeys += this.buckets[i].size();
      }
    }

    return totalKeys;
  }

  clear() {
    this.buckets = [...Array(this.size)].fill(null);
  }

  keys() {
    let allKeys = [];

    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i] !== null) {
        allKeys = allKeys.concat(this.buckets[i].keys());
      }
    }

    return allKeys;
  }

  values() {
    let allValues = [];

    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i] !== null) {
        allValues = allValues.concat(this.buckets[i].values());
      }
    }

    return allValues;
  }

  entries() {
    let allEntries = [];

    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i] !== null) {
        allEntries = allEntries.concat(this.buckets[i].entries());
      }
    }

    return allEntries;
  }
}
