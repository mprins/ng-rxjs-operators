import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, Subscription} from 'rxjs';
import {map, scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-multiple-stream',
  templateUrl: './multiple-stream.component.html',
  styleUrls: ['./multiple-stream.component.css']
})
export class MultipleStreamComponent implements OnInit, OnDestroy {

  sub: Subscription;
  position: any;
  @ViewChild('btnLeft', {static: true}) btnLeft;
  @ViewChild('btnRight', {static: true}) btnRight;
  @ViewChild('btnUp', {static: true}) btnUp;
  @ViewChild('btnDown', {static: true}) btnDown;

  ngOnInit(): void {
    // Create multiple streams, each in their own constant. Inside the pipe
    // We later merge these streams into one stream to which we subscribe.
    // The pipe() only has the values that are specific to this stream. The merge operator
    // executes the generic stuff
    const right$ = fromEvent(this.btnRight.nativeElement, 'click')
      .pipe(
        map(event => {
          return {direction: 'horizontal', value: 10};
        }) // 10 px to the right
      );
    const left$ = fromEvent(this.btnLeft.nativeElement, 'click')
      .pipe(
        map(event => {
          return {direction: 'horizontal', value: -10};
        }) // -10 px to the left
      );
    const up$ = fromEvent(this.btnUp.nativeElement, 'click')
      .pipe(
        map(event => {
          return {direction: 'vertical', value: -10};
        }) // -10 px up
      );
    const down$ = fromEvent(this.btnDown.nativeElement, 'click')
      .pipe(
        map(event => {
          return {direction: 'vertical', value: 10};
        }) // 10 px down
      );

    // combine our streams
    this.sub = merge(right$, left$, up$, down$).pipe(
      startWith({x: 200, y: 100}), // start with an object of { 100, 100}. This is passed as the 'accumulator' to the next operator
      scan((acc: any, current: any) => {
        // use the 'scan' operator as a reducer function. It takes the previous accumulated function and
        // adds the current value to it. Uncomment the next line to see the values of acc and current
        // console.log('acc is now: ', acc, ' current is now', current);
        return {
          x: acc.x + (current.direction === 'horizontal' ? current.value : 0),
          y: acc.y + (current.direction === 'vertical' ? current.value : 0)
        };
      })
    ).subscribe(result => {
      this.position = result;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
