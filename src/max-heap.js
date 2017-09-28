const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root=null;
		this.parentNodes=[];
		this.s=0;
	}

	push(data, priority) {
		var n=new Node(data,priority);
		this.insertNode(n);
		this.shiftNodeUp(n);

	}

	pop() {
		if(!this.isEmpty())
		{
			var a=this.detachRoot();
			this.restoreRootFromLastInsertedNode(a);
			this.shiftNodeDown(this.root);
			this.s--;
			return a.data;
		}

	}

	detachRoot() {
		

		if(this.root == this.parentNodes[0]){
			this.parentNodes.shift();
		}
		var a=this.root;
		this.root=null;
		return a;
	}

	restoreRootFromLastInsertedNode(detached) {
		if(typeof(detached.data)==='undefined')
			return;
		if(this.parentNodes.length>0)
		{
			this.root=this.parentNodes.pop();
			if(this.root.parent!=null && this.root.parent !== detached &&this.root.parent.right!=null&&this.root.parent.left!=null)
				this.parentNodes.unshift(this.root.parent);
			this.root.remove();
			this.root.appendChild(detached.left)
			this.root.appendChild(detached.right)
			if(this.root.left==null||this.root.right==null)
				this.parentNodes.unshift(this.root);
		}
		else
			this.root=null;
	}

	size() {
		return this.s;
	}

	isEmpty() {
		return this.parentNodes.length==0;
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
		this.s=0;
	}

	insertNode(node) {
		if(this.root==null)
		{
			this.root=node;
			this.parentNodes.push(node);
			this.s++;
		}
		else
		{
	
				this.parentNodes[0].appendChild(node);
				this.parentNodes.push(node);
				this.s++;
				if(this.parentNodes[0].left!=null&&this.parentNodes[0].right!=null)
				{
					this.parentNodes.shift();
			}

			
		}
	}

	shiftNodeUp(node) {
		if(node.parent!=null&&node.priority>node.parent.priority)
		{
			var q=-1,w=-1;
			for(var i=0;i<this.parentNodes.length;i++)
				if(this.parentNodes[i]==node)
					q=i;
				else if(this.parentNodes[i]==node.parent)
					w=i;

			if(q!=-1&&w!=-1)
			{
				this.parentNodes[q]=node.parent;
				this.parentNodes[w]=node;

			}
			else if(q!=-1)
				this.parentNodes[q]=node.parent;
			node.swapWithParent();
			if(node.parent==null)
			{
				this.root=node;
			}
			this.shiftNodeUp(node);

		}
			
	}

	shiftNodeDown(node) {
		if(node==null)
			return;
		if(node.left!=null)
		{
			var q=this.parentNodes.indexOf(node);
			if(node.right!=null)
			{
				if(node.left.priority>node.right.priority&&node.left.priority>node.priority)
				{
					var w=this.parentNodes.indexOf(node.left);
					if(q!=-1&&w!=-1)
					{
						this.parentNodes[q]=node.left;
						this.parentNodes[w]=node;
					}
					if(w!=-1)
						this.parentNodes[w]=node;
					if(node==this.root)
						this.root=node.left;
					node.left.swapWithParent();
					this.shiftNodeDown(node);
				}
				else if(node.right.priority>node.left.priority&&node.right.priority>node.priority)
				{
					var w=this.parentNodes.indexOf(node.right);
					if(q!=-1&&w!=-1)
					{
						this.parentNodes[q]=node.right;
						this.parentNodes[w]=node;
					}
					if(w!=-1)
						this.parentNodes[w]=node;
					if(node==this.root)
						this.root=node.right;
					node.right.swapWithParent();
					this.shiftNodeDown(node);
				}
			}
			else if(node.left.priority>node.priority)
			{
				var w=this.parentNodes.indexOf(node.left);
					if(q!=-1&&w!=-1)
					{
						this.parentNodes[q]=node.left;
						this.parentNodes[w]=node;
					}
					if(w!=-1)
						this.parentNodes[w]=node;
					if(node==this.root)
						this.root=node.left;
					node.left.swapWithParent();
					this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
