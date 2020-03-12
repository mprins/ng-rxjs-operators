import {Component, OnInit} from '@angular/core';
import {Observable, from} from "rxjs";
import {map, mapTo} from 'rxjs/operators'
import {Subscription} from "rxjs";


@Component({
  selector: 'map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {

  mapData: number[] = [];
  mapToData: string[] = [];
  mapToAsyncPipe: any[] = [];

  constructor() {
  }

  ngOnInit() {
    const source = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    // .map() - apply a function every emitted output.
    //
    // Pay attention: when retrieving values from an http-call, it is actually *one* value,
    // containing an array with the emitted object(s) by the server.
    // If you further need to apply projections/functions on each individual array result, then
    // apply a chained .map() function with another array.map() function inside. Like
    // .map(results => results.map(result => { ... }).
    // The code below only applies when the values are emitted on a one-by-one basis!
    source.pipe(
      map((val: number) => val = val * 10)
    )
      .subscribe(result => this.mapData.push(result));


    // .mapTo() - map the emission to a constant value
    source.pipe(
      mapTo('Hello World')
    )
      .subscribe(result => this.mapToData.push(result));
  }
}
