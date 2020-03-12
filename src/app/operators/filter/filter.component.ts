import {Component, OnInit} from '@angular/core';
import {from} from "rxjs";
import {filter} from 'rxjs/operators'
import {FormControl} from "@angular/forms";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  filterData: number[] = [];
  cityData: string[] = [];
  cityDataReactive: string[] = [];
  cityDataModel: string[] = [];
  myFormControl: FormControl;
  modelDrivenCities: any;


  constructor() {
    this.myFormControl = new FormControl('');
  }

  ngOnInit() {
    const source = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sourceCities = this.modelDrivenCities = from([
      'Haarlem',
      'Breda',
      'Amsterdam',
      'Groningen',
      'Hengelo',
      'Heerlen',
      'Geleen',
      'Arnhem',
      'Nijmegen',
      'Borne',
      'Diemen',
      'Nieuwegein'
    ]);

    // .filter() - only emit values that pass the provided condition.
    // In this case: only even numbers are passed through.
    source.pipe(
      filter(val => val % 2 === 0)
    )
      .subscribe(result => this.filterData.push(result));

    // Emit only the cities that starts with an 'H'.
    // Exercise: make this dynamic:
    // Create a textbox or dropdownlist in the UI so the user can decide which character to filter on.
    sourceCities.pipe(filter(city => city.startsWith('H')))
      .subscribe(result => this.cityData.push(result));

    // Dynamic filtering - the Model Driven way.
    // Find a formControl and subscribe to it's valueChanges() method
    this.myFormControl.valueChanges.subscribe(val => {
      console.log(val);
      this.cityDataReactive = [];
      sourceCities.pipe(
        filter((city: string) => city.toUpperCase().startsWith(val.toUpperCase()))
      )
        .subscribe(result => this.cityDataReactive.push(result))
    })
  }

  // Dynamic filtering - The Template Driven way.
  // Filter cities based on a value set with a local template variable
  filterCities(value) {
    this.cityDataModel = [];
    this.modelDrivenCities
      .filter(city => city.toUpperCase().startsWith(value.toUpperCase()))
      .subscribe(result => this.cityDataModel.push(result));
  }
}
