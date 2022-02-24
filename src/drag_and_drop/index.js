import { fromEvent, interval } from "rxjs";
import { mergeMap, takeUntil, throttle } from "rxjs/operators";

const box = document.getElementById("box");
const mouseMove = fromEvent(document, "mousemove");
const mouseUp = fromEvent(document, "mouseup");
const mouseDown = fromEvent(box, "mousedown");

mouseDown
  .pipe(
    mergeMap(() =>
      mouseMove.pipe(
        takeUntil(mouseUp),
        throttle(() => interval(10))
      )
    )
  )
  .subscribe((e) => {
    box.style.left = e.pageX - 50;
    box.style.top = e.pageY - 50;
  });

mouseDown.subscribe(() => console.log("fire mousedown"));
mouseUp.subscribe(() => console.log("fire mouseup"));
