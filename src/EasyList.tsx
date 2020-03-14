import * as React from "react";
import { useState } from "react";
import { ScrollView, View, LayoutChangeEvent } from "react-native";
import { EasyListProps } from "./types/EasyListProps";
import { VisibleWindow } from "./types/VisibleWindow";
import { Queue } from "./ds/Queue";

export function EasyList(props: EasyListProps) {
  const initialHeightTracker: Record<number, number[]> = {};
  const initialWindow: VisibleWindow = {
    paddingTillMin: 0,
    minCaptureOffset: 0,
    min: 0,
    max: 0,
    size: 0
  };
  const [heightTracker] = useState(initialHeightTracker);
  const [visibleWindow, setVisibleWindow] = useState(initialWindow);
  const callback = (index: number, height: number, width: number): void => {
    heightTracker[index] = [height, width];
  };
  return (
    <ScrollView>
      <View style={{ height: 200 }} />
      {getChildren(props, 0, callback)}
    </ScrollView>
  );
}

function getChildren(
  props: EasyListProps,
  firstIndex: number,
  callback: (index: number, height: number, width: number) => void
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
    res[i - min] = (
      <View
        onLayout={(event: LayoutChangeEvent) => {
          const height = event.nativeEvent.layout.height;
          const width = event.nativeEvent.layout.width;
          callback(i, height, width);
        }}
      >
        {children[i]}
      </View>
    );
  }
  return res;
}

function updatePool(prevMin: number, prevMax:number, newMin:number, newMax:number, pool: Queue<number>, indexKeyMap: Record<number, number>): void {
  
}

//#if [TEST]
export { getChildren };
//#endif
