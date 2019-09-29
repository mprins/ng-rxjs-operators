import {Component, OnInit} from '@angular/core';
import {delay, scan, switchMap} from 'rxjs/operators';
import {of, concat} from 'rxjs';

@Component({
  selector: 'app-progressive.enhancement',
  templateUrl: './progressive.enhancement.component.html',
  styleUrls: ['./progressive.enhancement.component.css']
})
export class ProgressiveEnhancementComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // Dummy call to get the list of users
    const getUsers = () => of([{id: 1, name: 'Kwinten'}]);

    // Dummy call that fetches the twitterHandles for users
    // with 1s delay
    const getUserTwitterHandle = (users) =>
      of([{id: 1, twitterHandle: 'KwintenP'}]).pipe(delay(1000));

    // Util function that adds the handles to the users
    const addTwitterHandlesToUsers = (users, twitterHandles) => {
      return users.map(user => {
        const twitterHandle =
          twitterHandles.find(handle => handle.id === user.id);
        return {...user, ...twitterHandle};
      });
    };

    // Get the initial list of users
    getUsers().pipe(
      switchMap(users => {
        // Once we have the initial list, use concat to pass them directly down.
        // After that has done, start a new call to fetch the twitter handles
        // for those users.
        return concat(of(users), getUserTwitterHandle(users))
          .pipe(
            // Using scan, we accumulate the initial users array and add the
            // twitter handles to it.
            // If you don't pass an initial value to scan, the first value it
            // sees will be passed directly 'down' and will serve as the initial
            // for the second event. That's why we see the users logged out in
            // our subscribe block instantly and the augmented users after 1s.
            scan((usrs: any[], twitterHandles) =>
              addTwitterHandlesToUsers(usrs, twitterHandles))
          );
      })
    ).subscribe(x => console.log(x));
  }

}
