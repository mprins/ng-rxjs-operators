import {Component, OnInit, ViewChild} from '@angular/core';
import {from, fromEvent, Subscription} from 'rxjs';
import {map, startWith, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-drag-drop-stream',
  templateUrl: './drag-drop-stream.component.html',
  styleUrls: ['./drag-drop-stream.component.css']
})
export class DragDropStreamComponent implements OnInit {

  sub: Subscription;
  position: any = {x: 100, y: 100};
  @ViewChild('mario', {static: true}) mario;

  ngOnInit(): void {
    // correction factor for image and current page. Your mileage may vary!
    const OFFSET_X = 180;
    const OFFSET_Y = 400;
    // 1. With Drag and drop, first you capture the mousedown event
    const down$ = fromEvent(document, 'mousedown');

    // 2. What to do when the mouse moves
    const move$ = fromEvent(document, 'mousemove')
      .pipe(
        map((event: any) => {
          return {x: event.pageX - OFFSET_X, y: event.pageY - OFFSET_Y}; // OFFSET as correction factor
        })
      );

    // 3. Capture the mouseup event
    const up$ = fromEvent(document, 'mouseup');

    // 4. extend the down$ stream and subscribe
    down$
      .pipe(
        startWith(this.position),
        // IF the down$-event happened, we ar no longer interested in it. Instead,
        // we switch the focus to the move$ event.
        // switchMap(event => move$),
        // BUT: we are only interested in the move until the mouse is released again.
        // So we add *another* pipe and use the takeUntil() operator.
        switchMap(event => move$.pipe(
          takeUntil(up$)
        ))
      )
      .subscribe(result => this.position = result);
  }

}
