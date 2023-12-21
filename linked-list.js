/** Node: node for a singly linked list. */
// This class represents a node in a singly linked list. Each node contains a value and a reference to the next node.

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */
// This class represents a linked list data structure. It consists of nodes that are chained together, with each node containing a value and a reference to the next node.

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		// Initialize the linked list with values from an array, if provided.
		for (let val of vals) this.push(val);
	}

	/** _get(idx): retrieve node at idx. */
	// Private method to retrieve the node at a specific index in the linked list.

	_get(idx) {
		let cur = this.head;
		let count = 0;

		// Traverse the linked list until the desired index is reached or the end of the list is reached.
		while (cur !== null && count != idx) {
			count += 1;
			cur = cur.next;
		}

		return cur;
	}

	/** push(val): add new value to end of list. */
	// Add a new value to the end of the linked list.

	push(val) {
		let newNode = new Node(val);

		// If the linked list is empty, set the new node as both the head and tail.
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			// Otherwise, set the new node as the next node of the current tail and update the tail to the new node.
			this.tail.next = newNode;
			this.tail = newNode;
		}

		this.length += 1;
	}

	/** unshift(val): add new value to start of list. */
	// Add a new value to the start of the linked list.

	unshift(val) {
		let newNode = new Node(val);

		// If the linked list is empty, set the new node as the head.
		if (this.head === null) {
			this.head = newNode;
		} else {
			// Otherwise, set the new node as the next node of the current head and update the head to the new node.
			newNode.next = this.head;
			this.head = newNode;
		}

		// If the linked list was empty, update the tail to the new node.
		if (this.length === 0) this.tail = this.head;

		this.length += 1;
	}

	/** pop(): return & remove last item. */
	// Remove and return the last item in the linked list.

	pop() {
		return this.removeAt(this.length - 1);
	}

	/** shift(): return & remove first item. */
	// Remove and return the first item in the linked list.

	shift() {
		return this.removeAt(0);
	}

	/** getAt(idx): get val at idx. */
	// Get the value at a specific index in the linked list.

	getAt(idx) {
		if (idx >= this.length || idx < 0) {
			throw new Error("Invalid index.");
		}

		return this._get(idx).val;
	}

	/** setAt(idx, val): set val at idx to val */
	// Set the value at a specific index in the linked list.

	setAt(idx, val) {
		if (idx >= this.length || idx < 0) {
			throw new Error("Invalid index.");
		}

		let cur = this._get(idx);
		cur.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */
	// Insert a new node with a value before a specific index in the linked list.

	insertAt(idx, val) {
		if (idx > this.length || idx < 0) {
			throw new Error("Invalid index.");
		}

		// If the index is 0, insert the new node at the start of the linked list.
		if (idx === 0) return this.unshift(val);
		// If the index is the length of the linked list, insert the new node at the end of the linked list.
		if (idx === this.length) return this.push(val);

		// Get the node before the desired index.
		let prev = this._get(idx - 1);

		// Create a new node with the given value and update the references to insert it into the linked list.
		let newNode = new Node(val);
		newNode.next = prev.next;
		prev.next = newNode;

		this.length += 1;
	}

	/** removeAt(idx): return & remove item at idx, */
	// Remove and return the item at a specific index in the linked list.

	removeAt(idx) {
		if (idx >= this.length || idx < 0) {
			throw new Error("Invalid index.");
		}

		// Special case: remove the first item in the linked list.
		if (idx === 0) {
			let val = this.head.val;
			this.head = this.head.next;
			this.length -= 1;
			// If the linked list has less than 2 items, update the tail to the new head.
			if (this.length < 2) this.tail = this.head;
			return val;
		}

		// Get the node before the desired index.
		let prev = this._get(idx - 1);

		// Special case: remove the tail.
		if (idx === this.length - 1) {
			let val = prev.next.val;
			prev.next = null;
			this.tail = prev;
			this.length -= 1;
			return val;
		}

		// Normal case: remove an item in the middle of the linked list.
		let val = prev.next.val;
		prev.next = prev.next.next;
		this.length -= 1;
		return val;
	}

	average() {
		if (this.length === 0) return 0;

		let total = 0;
		let current = this.head;

		// Calculate the sum of all values in the linked list.
		while (current) {
			total += current.val;
			current = current.next;
		}

		// Calculate and return the average value.
		return total / this.length;
	}
}

module.exports = LinkedList;
