export class Queue<T> {
    private count: number = 0;
    private end?: Node<T>;
    private start?: Node<T>;
    constructor() {
        
    }
    public get size(): number {
        return this.count;
    }
    public add(value: T): void {
        this.count++;
        if(this.end) {
            this.end.next = { value: value };
            this.end = this.end.next;
        } else {
            this.start = { value: value };
            this.end = this.start;
        }

    }
    public poll(): T {
        if(!this.start) { throw Error(emptyError); };
        const retVal = this.start.value;
        this.start = this.start.next;
        if(!this.start) {
            this.end = undefined;
        }
        this.count--;
        return retVal;
    }
    public peek(): T | undefined {
        return this.start && this.start.value;
    }
}
const emptyError: string = "Queue is empty";
interface Node<T> {
    value: T,
    next?: Node<T>
}