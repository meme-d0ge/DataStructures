export class Node{
    content: number;
    left: Node | null = null;
    right: Node | null = null;

    constructor(content: number) {
        this.content = content;
        this.left = null;
        this.right = null;
    }

    getMaxDeep(): number {
        let maxLeft = 0
        let maxRight = 0

        if (this.left){
            maxLeft = this.left.getMaxDeep() + 1
        }
        if (this.right){
            maxRight = this.right.getMaxDeep() + 1
        }
        return maxLeft < maxRight ? maxRight : maxLeft
    }
    getMin(): Node{
        if (this.left){
            return this.left.getMin()
        } else {
            return this
        }
    }
    getMax(): Node{
        if (this.right){
            return this.right.getMax()
        } else {
            return this
        }
    }
    printTree(position: string, space:string){
        process.stdout.write(`${space} ${position}: ${this.content}\n`)
        if (this.left){
            this.left.printTree(`L`, space + '   ')
        }
        if (this.right){
            this.right.printTree('R', space + '   ')
        }
    }
    searchNode(value: number):Node | null{
        if (this.content == value){
            return this
        } else if (this.content > value) {
            if (this.left){
                return this.left.searchNode(value);
            }
        } else if (this.content < value) {
            if (this.right){
                return this.right.searchNode(value);
            }
        }
        return null
    }
    addNode(node: Node){
        if (node.content < this.content){
            if (this.left){
                this.left.addNode(node)
            } else {
                this.left = node;
            }
        } else if (node.content > this.content) {
            if (this.right){
                this.right.addNode(node)
            } else {
                this.right = node;
            }
        }
    }
    deleteNode(value: number): Node | null {

        if (this.content == value){
            if (this.left && this.right){
                const maxLeft = this.left.getMax()
                const minRight = this.right.getMin()
                if (maxLeft.content < minRight.content){
                    this.deleteNode(maxLeft.content)
                    this.content = maxLeft.content
                } else {
                    this.deleteNode(minRight.content)
                    this.content = minRight.content
                }
            } else if (this.left){
                return this.left
            } else if (this.right){
                return this.right
            } else {
                return null
            }
        }
        else if (this.content > value) {
            if (this.left){
                this.left = this.left.deleteNode(value);
            }
        }
        else if (this.content < value) {
            if (this.right){
                this.right = this.right.deleteNode(value);
            }
        }
        return this
    }
}
export class BinaryTree{
    root: Node | null = null;

    getMaxDeep(): number | null{
        if (this.root){
            return this.root.getMaxDeep() + 1
        }
        return null;
    }
    getMin():Node | null {
        if (this.root){
            return this.root.getMin()
        }
        return null;
    }
    getMax(): Node | null{
        if (this.root){
            return this.root.getMax()
        }
        return null;
    }
    addNode(node: Node){
        if (this.root){
            this.root.addNode(node)
        } else {
            this.root = node
        }
    }
    printTree(){
        if (this.root){
            this.root.printTree('root', '')
        }
    }
    searchNode(value: number){
        if (this.root){
            return this.root.searchNode(value)
        }
        return null;
    }
    deleteNode(value: number){
        if (this.root){
            this.root.deleteNode(value)
        }
    }
}