import { getChildren, updatePool } from "./EasyList";
import { Text } from "react-native";
import React from "react";
import { EasyListProps } from "./types/EasyListProps";
import { Queue } from "./ds/Queue";

function getChildrenDataGen(
    childCount: number,
    aheadCount: number
): EasyListProps {
    const arr = new Array(childCount);
    return { children: arr, aheadCount: aheadCount };
}

function callback(index: number, height: number, width: number) {
    //no-op
}
function generateIndexKeyMay(size: number): Record<number, number> {
    const indexKeyMap: Record<number, number> = { };
    for(let i = 0; i < 100; i++) {
        indexKeyMap[i] = i;
    }
    return indexKeyMap;
}
function matchQueueWithArray(queue:Queue<number>, arr: number[]): boolean {
    arr.forEach((item) => {
        if(item !== queue.poll()) {
            return false;
        }
    });
    return true;
}
test("Case: No Children or Undefined", () => {
    const props = getChildrenDataGen(0, 0);
    expect(getChildren(props, 0, callback).length).toBe(0);

    props.children = undefined;
    expect(getChildren(props, 0, callback).length).toBe(0);
});

test("Case: Length Checks", () => {
    const data1 = getChildrenDataGen(1, 0);
    expect(getChildren(data1, 0, callback).length).toBe(1);

    const data2 = getChildrenDataGen(1, 5);
    expect(getChildren(data2, 0, callback).length).toBe(1);

    const data3 = getChildrenDataGen(10, 5);
    expect(getChildren(data3, 0, callback).length).toBe(6);
    expect(getChildren(data3, 5, callback).length).toBe(10);
    expect(getChildren(data3, -1, callback).length).toBe(6);
    expect(getChildren(data3, 2, callback).length).toBe(8);
    expect(getChildren(data3, 8, callback).length).toBe(7);
});

test("Case: Response Format", () => {
    const data1 = getChildrenDataGen(10, 5);
    expect(getChildren(data1, 0, callback)).toMatchSnapshot();
    expect(getChildren(data1, 3, callback)).toMatchSnapshot();

    data1.children = new Array(5).map((item) => {
        return <Text>Test me</Text>;
    });
    expect(getChildren(data1, 8, callback)).toMatchSnapshot();
});

test("update pool: Scrolldown, No overlap", ()=>{
    const indexKeyMap: Record<number, number> = generateIndexKeyMay(100);
    
    const queue = new Queue<number>();
    updatePool(1, 5, 6, 10, queue, indexKeyMap);
    expect(matchQueueWithArray(queue, [1,2,3,4,5])).toBe(true);
});

test("update pool: Scrolldown, overlap", ()=>{
    const indexKeyMap: Record<number, number> = generateIndexKeyMay(100);
    
    const queue = new Queue<number>();
    updatePool(1, 10, 5, 14, queue, indexKeyMap);
    expect(matchQueueWithArray(queue, [1,2,3,4])).toBe(true);
});

test("update pool: Scrolldown, max.min match", ()=>{
    const indexKeyMap: Record<number, number> = generateIndexKeyMay(100);
    
    const queue = new Queue<number>();
    updatePool(1, 5, 5, 9, queue, indexKeyMap);
    expect(matchQueueWithArray(queue, [1,2,3,4])).toBe(true);
});

test("update pool: Scrollup, No overlap", ()=>{
    const indexKeyMap: Record<number, number> = generateIndexKeyMay(100);
    
    const queue = new Queue<number>();
    updatePool(6, 10, 1, 5, queue, indexKeyMap);
    expect(matchQueueWithArray(queue, [1,2,3,4,5])).toBe(true);
});

test("update pool: Scrollup, overlap", ()=>{
    const indexKeyMap: Record<number, number> = generateIndexKeyMay(100);
    
    const queue = new Queue<number>();
    updatePool(5, 14, 1, 10, queue, indexKeyMap);
    expect(matchQueueWithArray(queue, [11,12,13,14])).toBe(true);
});

test("update pool: Scrollup, max.min match", ()=>{
    const indexKeyMap: Record<number, number> = generateIndexKeyMay(100);
    
    const queue = new Queue<number>();
    updatePool(5, 9, 1, 5, queue, indexKeyMap);
    expect(matchQueueWithArray(queue, [6,7,8,9])).toBe(true);
});
