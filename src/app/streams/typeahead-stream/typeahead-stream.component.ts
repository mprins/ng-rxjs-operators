import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {fromEvent, of} from 'rxjs';

// helper functions
const getContinents = keys =>
  [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
  ].filter(e => e.indexOf(keys.toLowerCase()) > -1);

const fakeContinentsRequest = keys =>
  of(getContinents(keys)).pipe(
    tap(_ => console.log(`API CALL at ${new Date()}`))
  );

@Component({
  selector: 'app-typeahead-stream',
  templateUrl: './typeahead-stream.component.html',
  styleUrls: ['./typeahead-stream.component.css']
})
export class TypeaheadStreamComponent implements OnInit {

  @ViewChild('typeahead', {static: true}) typeahead;
  constructor() {
  }

  ngOnInit(): void {
    fromEvent(this.typeahead.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(fakeContinentsRequest),
        tap(c => (document.getElementById('output').innerText = c.join('\n')))
      )
      .subscribe();
  }

}
