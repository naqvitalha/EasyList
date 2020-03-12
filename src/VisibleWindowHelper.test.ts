import { VisibleWindow } from "./types/VisibleWindow";
import { updateVisibleWindow } from "./VisibleWindowHelper";

function getVisibleWindow(obj: Record<string, number>): VisibleWindow {
    return { 
        min: 0,
        max: 0,
        paddingTillMin: 0,
        minCaptureOffset: 0,
        size: 0,
        ...obj
    }
}
function getHeightTracker(size: number, dim: number): Array<number[]> {
    return (new Array(size)).fill([dim, dim]);
}

test("Window Full: Basic min max, starting at 0 offset", ()=>{
    const itemCount = 20;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 9, size: 500, paddingTillMin: 0, minCaptureOffset: 0});

    //While intersecting
    VisibleWindow = getVisibleWindow({ size: 520 });
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({max: 10});

});

test("Window Full: Basic min max, starting at 0 offset", ()=>{
    const itemCount = 20;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 9, size: 500, paddingTillMin: 0, minCaptureOffset: 0});

    //While intersecting
    VisibleWindow = getVisibleWindow({ size: 520 });
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({max: 10});

});

test("Unwanted mutation to extra params", ()=>{
    const itemCount = 20;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 9, size: 500, paddingTillMin: 0, minCaptureOffset: 0});
});