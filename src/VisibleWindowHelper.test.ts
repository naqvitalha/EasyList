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

test("Min/Max: Window Full, starting at 0 offset", ()=>{
    const itemCount = 20;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 9, size: 500, paddingTillMin: 0, minCaptureOffset: 0});

    //While intersecting
    VisibleWindow = getVisibleWindow({ size: 520 });
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 10 });

});

test("Min/Max: Window Full (Indexer Change), starting at 0 offset", ()=>{
    const itemCount = 20;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);

    //Exact Match
    updateVisibleWindow(0, itemCount, 0, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 9, size: 500, paddingTillMin: 0, minCaptureOffset: 0});

    //While intersecting
    VisibleWindow = getVisibleWindow({ size: 520 });
    updateVisibleWindow(0, itemCount, 0, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min:0, max: 10 });

});

test("Min/Max: Window Half Full", ()=>{
    const itemCount = 3;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min:0, max: 2 });

    VisibleWindow = getVisibleWindow({ size: 500 });
    updateVisibleWindow(50, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 1, max: 2 });
});

test("Min/Max: Zero height last element", ()=>{
    let itemCount = 4;
    let VisibleWindow = getVisibleWindow({ size: 150 });
    let heights = getHeightTracker(itemCount, 50);
    heights[itemCount - 1] = [300, 0];
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min:0, max: 3 });
});

test("Min/Max: Zero height first element", ()=>{
    let itemCount = 4;
    let VisibleWindow = getVisibleWindow({ size: 150 });
    let heights = getHeightTracker(itemCount, 50);
    heights[0] = [300, 0];
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min:0, max: 3 });
});

test("Min/Max/CaptureOffset: Scroll Around", () => {
    const itemCount = 200;
    let VisibleWindow = getVisibleWindow({ min: 0, max: 4, size: 500 });
    const heights = getHeightTracker(itemCount, 100);

    //ScrollDown by 200px
    updateVisibleWindow(200, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 2, max: 6, minCaptureOffset: 200 });

    //ScrollUp by 50px
    updateVisibleWindow(150, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 1, max: 6, minCaptureOffset: 100 });

     //ScrollDown by 100px
     updateVisibleWindow(250, itemCount, 1, heights, VisibleWindow);
     expect(VisibleWindow).toMatchObject({ min: 2, max: 7, minCaptureOffset: 200 });

      //ScrollDown by 750px
      updateVisibleWindow(1000, itemCount, 1, heights, VisibleWindow);
      expect(VisibleWindow).toMatchObject({ min: 10, max: 14, minCaptureOffset: 1000 });

       //ScrollTo 150px
       updateVisibleWindow(150, itemCount, 1, heights, VisibleWindow);
       expect(VisibleWindow).toMatchObject({ min: 1, max: 6, minCaptureOffset: 100 });

        //ScrollTo max
        updateVisibleWindow(19500, itemCount, 1, heights, VisibleWindow);
        expect(VisibleWindow).toMatchObject({ min: 195, max: 199, minCaptureOffset: 19500 });

        //ScrollToTop
        updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
        expect(VisibleWindow).toMatchObject({ min: 0, max: 4, minCaptureOffset: 0 });

        //Modify to make first and lastItems of zero height
        heights[0] = [300, 0];
        heights[itemCount - 1] = [300, 0];

         //ScrollTo max
         updateVisibleWindow(19300, itemCount, 1, heights, VisibleWindow);
         expect(VisibleWindow).toMatchObject({ min: 194, max: 199, minCaptureOffset: 19300 });
 
           //ScrollTo 19499.9px
           updateVisibleWindow(19299, itemCount, 1, heights, VisibleWindow);
           expect(VisibleWindow).toMatchObject({ min: 193, max: 199, minCaptureOffset: 19200 });

         //ScrollTo 0.1px
         updateVisibleWindow(0.5, itemCount, 1, heights, VisibleWindow);
         expect(VisibleWindow).toMatchObject({ min: 1, max: 6, minCaptureOffset: 0 });

         //ScrollToTop
         updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
         expect(VisibleWindow).toMatchObject({ min: 0, max: 5, minCaptureOffset: 0 });

});

test("Unwanted mutation to extra params", ()=>{
    const itemCount = 20;
    let VisibleWindow = getVisibleWindow({ size: 500 });
    const heights = getHeightTracker(itemCount, 50);
    const serializedHeights = JSON.stringify(heights);
    updateVisibleWindow(0, itemCount, 1, heights, VisibleWindow);
    expect(VisibleWindow).toMatchObject({ min: 0, max: 9, size: 500, paddingTillMin: 0, minCaptureOffset: 0});
    expect(JSON.stringify(heights)).toBe(serializedHeights);
});