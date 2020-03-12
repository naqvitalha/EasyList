import { VisibleWindow } from "./types/VisibleWindow";

export function updateVisibleWindow(offset: number, itemCount: number, indexer: number, heightTracker: Record<number, number[]>, visibleWindow: VisibleWindow): VisibleWindow {
    let deltaMin = offset - visibleWindow.minCaptureOffset;
    if(deltaMin > 0) {
        for(let i = visibleWindow.min; i < itemCount; i++) {
            deltaMin -= heightTracker[i][indexer];
            if(deltaMin <= 0) {
                visibleWindow.min = i;
                visibleWindow.minCaptureOffset = offset + deltaMin;
                break;
            }
        }
    } else if (deltaMin < 0) {
        for(let i = visibleWindow.min - 1; i>= 0; i--) {
            deltaMin += heightTracker[i][indexer];
            if(deltaMin >= 0) {
                visibleWindow.min = i;
                visibleWindow.minCaptureOffset = offset - deltaMin;
            }
        }
    }
    let adjustedWindowSize = Math.max(visibleWindow.size + offset - visibleWindow.minCaptureOffset, visibleWindow.size);
    for(let i = visibleWindow.min; i < itemCount; i++) {
        adjustedWindowSize -= heightTracker[i][indexer];
        visibleWindow.max = i;
        if(adjustedWindowSize <= 0) {
            break;
        }
    }
    return visibleWindow;
}