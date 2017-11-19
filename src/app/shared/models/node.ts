export class NodeModel {
    element:string;
    next:NodeModel; 
    constructor(element)
    {
        this.element = element;
        this.next = null;
    }
}