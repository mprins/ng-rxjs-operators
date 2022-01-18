import {Component, OnInit, ViewChild} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {fromEvent, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

interface ICountry {
  name: string;
  capital: string;
  flag: string;
}

const errorCountry: ICountry = {
  name: 'Error',
  capital: 'Not found',
  flag: ''
};

@Component({
  selector: 'app-typeahead-stream',
  templateUrl: './typeahead-stream.component.html',
  styleUrls: ['./typeahead-stream.component.css']
})
export class TypeaheadStreamComponent implements OnInit {

  @ViewChild('typeahead', {static: true}) typeahead;
  countries$: Observable<ICountry[]>;
  numResults$: Observable<number>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // 1. In the template we loop over countries$ by using the async pipe
    this.countries$ = fromEvent(this.typeahead.nativeElement, 'keyup')
      .pipe(
        // 2. There should be at least 2 characters in the textbox
        filter((e: any) => e.target.value.length >= 2),
        // 3. Wait for 400ms to continue, to prevent unnecessary http-calls
        debounceTime(400),
        // 4. Map out the value of the textbox, we want only the characters
        map((e: any) => e.target.value),
        //  5. Only emit when the current value is different than the last
        distinctUntilChanged(),
        // 6. Pass keyword and switch execution to getCountries http-call
        switchMap(keyword => this.getCountries(keyword))
      );
  }

  getCountries(keyword): Observable<ICountry[]> {
    // 7. Create the actual http-call.
    // We could/should store the http-address in a
    // separate variable, this method inside a service, and so on.
    return this.http.get<ICountry[]>(`https://restcountries.com/v2/name/${keyword}`)
      .pipe(
        // 8. catch http-errors and return a 'not found' country
        catchError(err => {
          console.log(err);
          return of([errorCountry]);
        })
      );
  }
}
