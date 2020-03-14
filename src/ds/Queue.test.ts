import { Queue } from "./Queue"

test("Empty poll", ()=> {
    const queue = new Queue<number>();
    try {
        queue.poll();

    } catch(err) {
        expect(err.message).toContain("empty");
    }
});

test("One element", ()=> {
    const queue = new Queue<number>();
    queue.add(5);
    expect(queue.peek()).toBe(5);
    expect(queue.size).toBe(1);
    expect(queue.poll()).toBe(5);
    expect(queue.peek()).toBe(undefined);

    //Repeating to check state of reset
    queue.add(5);
    expect(queue.peek()).toBe(5);
    expect(queue.size).toBe(1);
    expect(queue.poll()).toBe(5);
    expect(queue.peek()).toBe(undefined);

});

test("Given sequence match", () => {
    const elements = [1, 2, 3, 4, 4, 4, 5, 5, 6, 7, 8];
    const queue = new Queue<number>();
    let index = 0;
    elements.forEach((item)=>{
        queue.add(item);
    });
    while(queue.peek()) {
        //check for the right value at the right place
        expect(queue.peek()).toBe(elements[index++]);

        //check whether peek is consistent with poll
        expect(queue.peek()).toBe(queue.poll());
    }
});