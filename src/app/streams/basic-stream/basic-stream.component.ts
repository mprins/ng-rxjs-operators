import {Component, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, of} from 'rxjs';
import {startWith, map, scan, tap, distinctUntilChanged, distinctUntilKeyChanged} from 'rxjs/operators';

@Component({
  selector: 'app-basic-stream',
  templateUrl: './basic-stream.component.html',
  styleUrls: ['./basic-stream.component.css']
})
export class BasicStreamComponent implements OnInit {
  // basic text stream
  textStream1 = 'Type some text above...';
  // tslint:disable-next-line:max-line-length
  @ViewChild('text1', {static: true}) text1; // two parameters for @ViewChild(), see for instance: https://github.com/angular/angular/issues/30291, https://stackoverflow.com/questions/56704164/angular-viewchild-error-expected-2-arguments-but-got-1

  // Workshop: create a list of todo-items, add them to an array
  todoItems: string[] = [];

  // mario
  position: any;
  @ViewChild('btnRight', {static: true}) btnRight;

  // break the onInit() up in smaller functions
  ngOnInit(): void {
    this.onTextStream1();
    this.onMarioMove();
    this.ofOperator();
  }

  // *********************
  // Helper functions
  // *********************

  // 1. subscribe to a stream of characters, coming from the textbox
  onTextStream1() {
    fromEvent(this.text1.nativeElement, 'keyup')
      // uncomment the next lines to see the map() operator in action.
      // .pipe(
      //   map((event: KeyboardEvent) => event.key),
      // )
      .subscribe((event: any) => this.textStream1 = event.target.value);
  }

  // 2. move mario
  onMarioMove() {
    fromEvent(this.btnRight.nativeElement, 'click')
      .pipe(
        map(event => 10), // 1. map the event to a useful value, in this case 10 (for 'move 10 pixels)
        startWith({x: 100, y: 100}), // start with an object of { 100, 100}. This is passed as the 'accumulator' to the next operator
        scan((acc: any, current: number) => {
          // use the scan operator as a reducer function. It takes the previous accumulated function and
          // adds the current value to it. Uncomment the next line to see the values of acc and current
          // console.log('acc is now: ', acc, ' current is now', current);
          return {
            x: acc.x + current,
            y: acc.y
          };
        })
      )
      .subscribe(result => {
        this.position = result;
      });
  }

  // 3. Demonstrate of() operator
  // "Emit variable amount of values in a sequence and then emits a complete notification"
  ofOperator() {
    const source$ = of(1, 2, 3, 4, 5);
    source$.subscribe(
      val => console.log(val),
      error => console.log(error),
      () => console.log('Emitting complete')
    );
    // after this sequence, the source$ observable has completed and no longer emits values.
  }
}
