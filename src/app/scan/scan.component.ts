import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
	selector   : 'scan',
	templateUrl: './scan.component.html'
})
export class ScanComponent implements OnInit {

	scanData: number[] = [];

	constructor() {
	}

	ngOnInit() {
		const source = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


		// .scan() acts as the classic .reduce() function on array's. It takes an
		// accumulator and the current value. The accumulator is persisted over time, the
		// current value is projected (in this case: added to) the accumulator. The accumulated
		// value is then emitted.
		// In this example all the values in the array are added to each other:
		//  0 + 1 = 1
		//  1 + 2 = 3
		//  3 + 3 = 6, and so on...
		// The .startsWith() operator is not required, but added as a convenience.
		source
			.startWith(0)
			.scan((acc, curr) => acc + curr)
			.subscribe(result => this.scanData.push(result))
	}
}
