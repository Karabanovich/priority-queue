const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if(maxSize!=null)
			this.maxSize=maxSize;
		else
			this.maxSize=30;
		this.heap=new MaxHeap();
	}

	push(data, priority) {
		
		if(this.maxSize>this.heap.size())
		{
			this.heap.push(data,priority);
		}
		else
			
			throw new Error('Error');
		
	}

	shift() {
		if(!this.isEmpty())
			return this.heap.pop();
		else
			throw new Error('Error');

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
