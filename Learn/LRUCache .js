class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;

        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;

        this.cache = new Map();

        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Add node right after head
    addNode(node) {
        node.next = this.head.next;
        node.prev = this.head;

        this.head.next.prev = node;
        this.head.next = node;
    }

    // Remove node from list
    removeNode(node) {
        const prevNode = node.prev;
        const nextNode = node.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    // Move node to front
    moveToFront(node) {
        this.removeNode(node);
        this.addNode(node);
    }

    // Remove least recently used node
    removeLRU() {
        const lruNode = this.tail.prev;

        this.removeNode(lruNode);

        return lruNode;
    }

    get(key) {
        if (!this.cache.has(key)) {
            console.log(`Key ${key} not found`);
            return -1;
        }

        const node = this.cache.get(key);

        this.moveToFront(node);

        console.log(
            `GET(${key}) => ${node.value}`
        );

        return node.value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            const existingNode =
                this.cache.get(key);

            existingNode.value = value;

            this.moveToFront(existingNode);

            console.log(
                `Updated (${key}, ${value})`
            );

            return;
        }

        const newNode =
            new Node(key, value);

        this.cache.set(key, newNode);

        this.addNode(newNode);

        console.log(
            `Inserted (${key}, ${value})`
        );

        if (
            this.cache.size >
            this.capacity
        ) {
            const lruNode =
                this.removeLRU();

            this.cache.delete(
                lruNode.key
            );

            console.log(
                `Evicted Key ${lruNode.key}`
            );
        }
    }

    print() {
        let current =
            this.head.next;

        const result = [];

        while (current !== this.tail) {
            result.push(
                `[${current.key}:${current.value}]`
            );

            current = current.next;
        }

        console.log(
            "Cache:",
            result.join(" <-> ")
        );
    }
}


// Test case
const cache = new LRUCache(3);

cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);

cache.print();


// full execution
const Cache = new LRUCache(3);

cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);

cache.print();

cache.get(1);

cache.print();

cache.put(4, 40);

cache.print();

cache.get(3);

cache.print();

cache.put(5, 50);

cache.print();