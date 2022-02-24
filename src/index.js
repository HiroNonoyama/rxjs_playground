import { fromEvent, interval } from "rxjs";
import { mergeMap, takeUntil, throttle } from "rxjs/operators";

const box = document.getElementById("box");
const mouseMove = fromEvent(document, "mousemove");
const mouseUp = fromEvent(document, "mouseup");
const mouseDown = fromEvent(box, "mousedown");

mouseDown
  .pipe(
    mergeMap((e) =>
      mouseMove.pipe(
        takeUntil(mouseUp),
        throttle(() => interval(20))
      )
    )
  )
  .subscribe((e) => {
    box.style.left = e.pageX;
    box.style.top = e.pageY;
  });

mouseDown.subscribe((e) => console.log("mousedown happend"));
mouseUp.subscribe((e) => console.log("mouseup happend"));
