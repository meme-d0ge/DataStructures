enum RotationType{
    Right,
    BigRight,
    Left,
    BigLeft,
    None
}
export class Node{
    content: number;
    height: number = 0;
    left: Node | null = null;
    right: Node | null = null;

    constructor(content: number) {
        this.content = content;
        this.left = null;
        this.right = null;
    }

    private getHeight(node: Node | null): number{
        return node === null ? -1 : node.height
    }
    private updateHeight(): number{
        const rightHeight = this.getHeight(this.right)
        const leftHeight = this.getHeight(this.left)

        return (rightHeight < leftHeight ? leftHeight : rightHeight) + 1
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

    private getRotationDirection(){
        const difference = this.getHeight(this.right) - this.getHeight(this.left)
        switch (difference){
            case 2:
                if (this.getHeight(this.right?.left || null) > this.getHeight(this.right?.right || null)) {
                    return RotationType.BigLeft
                }
                return RotationType.Left
            case -2:
                if (this.getHeight(this.left?.right || null) > this.getHeight(this.left?.left || null)){
                    return RotationType.BigRight
                }
                return RotationType.Right
        }
        return RotationType.None
    }
    private bigRightRotate(){
        if (this.left){
            this.left.leftRotate()
            this.rightRotate()
        }
    }
    private bigLeftRotate(){
        if (this.right){
            this.right.rightRotate()
            this.leftRotate()
        }
    }
    private rightRotate(){
        if (this.left){
            this.swap(this.left, this)
            const rightCopy = this.right
            this.right = this.left
            this.left = this.right.left
            this.right.left = this.right.right
            this.right.right = rightCopy

            this.right.height = this.right.updateHeight()
            this.height = this.updateHeight()
        }
    }
    private leftRotate(){
        if (this.right){
            this.swap(this.right, this)
            const leftCopy = this.left
            this.left = this.right
            this.right = this.left.right
            this.left.right = this.left.left
            this.left.left = leftCopy

            this.left.height = this.left.updateHeight()
            this.height = this.updateHeight()
        }
    }
    private swap(node: Node, node2: Node){
        const content_node = node.content
        node.content = node2.content
        node2.content = content_node

        const height_node = node.height
        node.height = node2.height
        node2.height = height_node
    }
    private balanceNode(){
        const rotateDirection = this.getRotationDirection()
        switch (rotateDirection){
            case RotationType.Right:
                this.rightRotate()
                break
            case RotationType.BigRight:
                this.bigRightRotate()
                break
            case RotationType.Left:
                this.leftRotate()
                break
            case RotationType.BigLeft:
                this.bigLeftRotate()
                break
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
                this.height = this.updateHeight()
                this.balanceNode()
            } else {
                this.left = node;
                this.height = this.updateHeight()
                this.balanceNode()
            }
        } else if (node.content > this.content){
            if (this.right){
                this.right.addNode(node)
                this.height = this.updateHeight()
                this.balanceNode()

            } else {
                this.right = node;
                this.height = this.updateHeight()
                this.balanceNode()
            }
        }
    }
    deleteNode(value: number): Node | null{
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
                this.height = this.updateHeight()
                this.left?.balanceNode()
            }
        }
        else if (this.content < value) {
            if (this.right){
                this.right = this.right.deleteNode(value);
                this.height = this.updateHeight()
                this.right?.balanceNode()
            }
        }
        return this
    }
    printTree(position: string, space:string){
        process.stdout.write(`${space} ${position}: ${this.content} | H: ${this.height}\n`)
        if (this.left){
            this.left.printTree(`L`, space + '   ')
        }
        if (this.right){
            this.right.printTree('R', space + '   ')
        }
    }
}
export class AVL_Tree{
    root: Node | null = null;
    getMin(): Node | null{
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
    deleteNode(value: number){
        if (this.root){
            this.root.deleteNode(value)
        }
    }
    searchNode(value: number):Node | null{
        if (this.root){
            return this.root.searchNode(value)
        }
        return null;
    }
    printTree(){
        if (this.root){
            this.root.printTree('root', '')
        }
    }

}