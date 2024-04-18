
const hashMap = () => {
  let buckets = [];
  let bucket_size = 16;
  // reset everytime clear called
  let insert_count = 0;
  let load_factor = 0.75;

  // hash table initializer
  const returnBucketSize = () => bucket_size;
  const buildTable = (size) => {
    for (let i = 0; i < size; i++) {
      buckets[i] = [null];
    }
  };
  buildTable(bucket_size);

  const node = (key = null, value = null) => {
    return { key, value };
  };

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    // apparently odd numbers fair better in avoiding collisions
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucket_size;
    }

    return hashCode;
  };

  const bucket_fetch = (key) => {
    const hashCode = hash(key);
    return buckets[hashCode];
  };

  const set = (key, value) => {
    const bucket = bucket_fetch(key);
    //see if key exists
    let find_node = get(key);
    if (find_node !== null) {
      find_node.value = value;
    } else {
      // careful with this else and look for edge cases not triggered
      const newNode = node(key, value);
      bucket.push(newNode);
      insert_count += 1;
      if(insert_count/bucket_size >= load_factor){
        resize();
      }
    }
  };

  const has = (key) => {
    const bucket = bucket_fetch(key);
    if (bucket[0] !== null) {
      for (const tmpnode of buckets[bucket]) {
        if (tmpnode.key === key) {
          return true;
        }
      }
    }
    return false;
  };

  const get = (key) => {
    const bucket = bucket_fetch(key);
    if (buckets[bucket] == null);
    {
      return null;
    }
    for (const tmpnode of buckets[bucket]) {
      if (tmpnode.key === key) {
        return tmpnode;
      }
    }
    return null;
  };

  const remove = (key) => {
    //bool return type if successful
    const bucket = bucket_fetch(key);
    for (tmpnode in buckets[bucket]) {
      let i = 0;
      if (tmpnode.key === key) {
        buckets[bucket][i] = null;
        return true;
      }
      i += 1;
    }
    return false;
  };

  const length = () => {
    let acc = 0;
    // for bucket in buckets
    for (const bucket of buckets) {
      for (const tmpnode of bucket) {
        if (tmpnode != null) {
          acc += 1;
        }
      }
    }
    return acc;
  };

  const clear = () => {
    for (bucket in buckets) {
      bucket = null;
      insert_count = 0;
    }
  };

  const keys = () => {
    // returns array containing all the keys
    let arr = [];
    // for bucket in buckets
    for (const bucket of buckets) {
      for (const tmpnode of bucket) {
        if (tmpnode != null) {
          arr.push(tmpnode.key);
        }
      }
    }
    return arr;
  };

  const values = () => {
    // returns array containing all the values
    let arr = [];
    // for bucket in buckets
    for (const bucket of buckets) {
      for (const tmpnode of bucket) {
        if (tmpnode != null) {
          arr.push(tmpnode.value);
        }
      }
    }
    return arr;
  };

  const entries = () => {
    // returns array containg each value pair [key, value]
    let arr = [];
    // for bucket in buckets
    for (const bucket of buckets) {
      for (const tmpnode of bucket) {
        if (tmpnode != null) {
          const entry = [tmpnode.key, tmpnode.value];
          arr.push(entry);
        }
      }
    }
    return arr;
  };

  const resize = () => {
    //length is costly since it needs to iterate n times for each n inserted. 
    const entry_length = length();
    const load = entry_length / bucket_size;
    console.log("load: " + load);
    if (load >= load_factor) {
      // generate the entries array
      const collection = entries();
      // clear the buckets array and rebuild bigger
      clear();
      bucket_size *= 2;
      buildTable(bucket_size);
      // for each element in the entries, has the key and create node and store it again
      for (const entry of collection) {
        const key = entry[0];
        const value = entry[1];
        set(key, value);
      }
    }
  };

  return { returnBucketSize, hash, set, entries };
};

// random names test hash key insertion and entry development
const array = [
  ["Alice", 9083459432],
  ["Bob", 5551234567],
  ["Charlie", 8476329015],
  ["David", 2125550100],
  ["Emily", 4153928765],
  ["Frank", 6172678901],
  ["Grace", 3038376542],
  ["Henry", 9734821095],
  ["Isla", 7862314560],
  ["Jack", 4079863210],
];
const exClass = hashMap();

for (const entry of array) {
  exClass.set(entry[0], entry[1]);
}
console.dir(exClass.entries());
console.log("Table size is: " + exClass.returnBucketSize());

// test driver code for resizing table
const amendments = [
  ["Zack", 9083230984],
  ["Bill", 9083230984],
  ["Sean", 9083230984],
  ["Scott", 9083230984],
  ["William", 9083230984],
];

for (const entry of amendments) {
  exClass.set(entry[0], entry[1]);
}
console.dir(exClass.entries());
console.log("Table size is: " + exClass.returnBucketSize());
