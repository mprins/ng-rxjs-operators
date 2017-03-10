import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter'

@Component({
	selector   : 'filter',
	templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

	filterData: number[] = [];
	cityData: string[]   = [];

	constructor() {
	}

	ngOnInit() {
		const source       = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		const sourceCities = Observable.from([
			'Haarlem',
			'Breda',
			'Amsterdam',
			'Groningen',
			'Hengelo',
			'Heerlen',
			'Geleen',
			'Arnhem',
			'Nijmegen',
			'Borne'
		]);

		// .filter() - only emit values that pass the provided condition.
		// In this case: only even numbers are passed through.
		source.filter(val => val % 2 === 0)
			.subscribe(result => this.filterData.push(result));

		// Emit only the cities that starts with an 'H'.
		// Exercise: make this dynamic:
		// Create a textbox or dropdownlist in the UI so the user can decide which character to filter on.
		sourceCities.filter(city => city.startsWith('H'))
			.subscribe(result => this.cityData.push(result));

	}
}
