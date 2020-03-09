import { getChildren, EasyListProps } from "./EasyList";

function getChildrenDataGen(
  childCount: number,
  aheadCount: number
): EasyListProps {
  const arr = new Array(childCount);
  return { children: arr, aheadCount: aheadCount };
}

test("Case: No Children or Undefined", () => {
  const props = getChildrenDataGen(0, 0);
  expect(getChildren(props, 0).length).toBe(0);

  props.children = undefined;
  expect(getChildren(props, 0).length).toBe(0);
});

test("Case: Length Checks", () => {
  const data1 = getChildrenDataGen(1, 0);
  expect(getChildren(data1, 0).length).toBe(1);

  const data2 = getChildrenDataGen(1, 5);
  expect(getChildren(data2, 0).length).toBe(1);

  const data3 = getChildrenDataGen(10, 5);
  expect(getChildren(data3, 0).length).toBe(6);
  expect(getChildren(data3, 5).length).toBe(10);
  expect(getChildren(data3, -1).length).toBe(6);
  expect(getChildren(data3, 2).length).toBe(8);
  expect(getChildren(data3, 8).length).toBe(7);
});

// test("Case: Response Format", () => {
//   const data2 = getChildrenDataGen(1, 5);
//   expect(getChildren(data2, 0)).toMatchSnapshot();
// });
