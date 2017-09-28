class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.parent=null;
		this.left=null;
		this.right=null;
	}

	appendChild(node) {
		if(node!==null)
		{
		if(this.left===null)
		{
			node.parent=this;
			this.left=node;
		}
		else if(this.right===null)
		{
			node.parent=this;
			this.right=node;
		}
		}
	}

	removeChild(node) {
		if(this.left==node)
		{
			this.left=null;
			node.parent=null;
		}
		else if(this.right==node)
		{
			this.right=null;
			node.parent=null;
		}
		else throw new Error('Error');
	}

	remove() {
		if(this.parent!==null)
		{
			this.parent.removeChild(this);

		}
	}

	swapWithParent() {
		
		if(this.parent!==null)
		{
			var parent=this.parent;
			var nextParent=this.parent.parent;
			var left=parent.left;
			var right=parent.right;
			var l=this.left;
			var r=this.right;
			var f=false;
			if(this.parent.left==this)
				f=true;
			this.remove();
			parent.remove();
			if(nextParent!==null)
				nextParent.appendChild(this);
			parent.left=null;
			parent.right=null;
			parent.appendChild(this.left);
			parent.appendChild(this.right);
			this.left=null;
			this.right=null;
			if(f)
			{
				this.appendChild(parent);
				this.appendChild(right);
			}
			else
			{
				this.appendChild(left);
				this.appendChild(parent);
			}

			
		}
	}
}

module.exports = Node;
