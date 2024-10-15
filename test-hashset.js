import HashSet from "./hashset.js";

const test = new HashSet();

test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');
test.set('moon');

console.log('Number of keys:', test.length());
console.log('Number of buckets:', test.size);

console.log(test.keys());
