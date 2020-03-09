import * as React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native-web";

export interface EasyListProps {
  aheadCount: number;
  children: React.ReactNode[];
}

export function EasyList(props: EasyListProps) {
  const [pool, updatePool] = useState(new Set());
  const genericKey = "g";
  return (
    <ScrollView>
      {props.children.map(item => (
        <View key={genericKey}>{item}</View>
      ))}
    </ScrollView>
  );
}

function getChildren(props: EasyListProps): React.ReactNode {
  const maxIndex = props.children.length - 1;
  if (maxIndex < 0) {
    return undefined;
  }
  const aheadCount = props.aheadCount;
  const firstIndex = 0;
  const min = Math.max(0, firstIndex - aheadCount);
  const max = Math.min(maxIndex, firstIndex + aheadCount);
  const res = new Array<React.ReactNode>(max - min + 1);
  for (let i = min; i <= max; i++) {
    res[i - min] = <View>{props.children[i]}</View>;
  }
}
