import { VisibleWindow } from "./types/VisibleWindow";

export function updateVisibleWindow(offset: number, itemCount: number, indexer: number, heightTracker: Record<number, number[]>, visibleWindow: VisibleWindow): VisibleWindow {
    let deltaMin = offset - visibleWindow.minCaptureOffset;
    if(deltaMin > 0) {
        for(let i = visibleWindow.min; i < itemCount; i++) {
            deltaMin -= heightTracker[i][indexer];
            if(deltaMin <= 0) {
                visibleWindow.min = deltaMin < 0 ? i : Math.min (itemCount - 1, i + 1);
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
                break;
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
    return applyZeroEdgeCorrection(offset, itemCount, indexer, heightTracker, visibleWindow);
}

function applyZeroEdgeCorrection(offset: number, itemCount: number, indexer: number, heightTracker: Record<number, number[]>, visibleWindow: VisibleWindow): VisibleWindow {
    if(visibleWindow.min === 1 && offset <= visibleWindow.minCaptureOffset && heightTracker[0][indexer] === 0) {
        visibleWindow.min = 0;
    }
    if(visibleWindow.max === itemCount - 2 && heightTracker[itemCount - 1][indexer] === 0) {
        visibleWindow.max = itemCount - 1;
    }
    return visibleWindow;
}

//#if [TEST]
export { applyZeroEdgeCorrection };
//#endif