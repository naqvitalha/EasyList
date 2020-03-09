import * as React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native-web";

export interface EasyListProps {
  aheadCount: number;
  children: React.ReactNodeArray | undefined;
}

export function EasyList(props: EasyListProps) {
  const [pool, updatePool] = useState(new Set());
  const genericKey = "g";
  return (
    <ScrollView>
      <View style={{ height: 600 }} />
      {getChildren(props, 0)}
    </ScrollView>
  );
}

export function a(t: number): number {
  return t;
}

function getChildren(
  props: EasyListProps,
  firstIndex: number
): React.ReactNodeArray {
  const children = props.children || [];
  const maxIndex = children.length - 1;
  if (maxIndex < 0) {
    return children;
  }
  firstIndex = Math.max(firstIndex, 0);
  const aheadCount = props.aheadCount;
  const min = Math.max(0, firstIndex - aheadCount);
  const max = Math.min(maxIndex, firstIndex + aheadCount);
  const res = new Array<React.ReactNode>(max - min + 1);
  for (let i = min; i <= max; i++) {
    res[i - min] = <View>{children[i]}</View>;
  }
  return res;
}

export { getChildren };
