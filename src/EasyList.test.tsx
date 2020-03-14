import { getChildren } from "./EasyList";
import { Text } from "react-native";
import React from "react";
import { EasyListProps } from "./types/EasyListProps";

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
