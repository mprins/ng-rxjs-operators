import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, combineLatest, forkJoin} from 'rxjs';
import {switchMap, tap, map, delay, startWith} from 'rxjs/operators';

@Component({
    selector   : 'app-movie3',
    templateUrl: './movie3.component.html',
    styleUrls  : ['./movie3.component.css'],
})
export class Movie3Component implements OnInit {
    movie$: Observable<any[]>; // TODO: create a movie model class or -interface
    url = 'https://www.omdbapi.com/?apikey=f1f56c8e&'; // Please register your own API key.

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    searchMovies3(keyword: string): void {
        // search for movies plus details. BETTER solution: move this to a service and use a store.
        this.movie$ = this.http.get(`${this.url}s=${keyword}`).pipe(
            map((movies: any) => movies.Search), // Map out movies.Search array, b/c of this API
            switchMap((movies: any[]) => {
                // fetch details, using combineLatest() static function.
                // Credits: Stefan de Waard, SdeWaard@ilionx.com
                return combineLatest(
                    movies.map((movie: any) => {
                        return this.http.get(`${this.url}i=${movie.imdbID}`)
                            .pipe(
                                delay(Math.random() * 2000),
                                startWith(movie)
                            );
                    })
                );
            })
        );
    }

    clear() {
        this.movie$ = null;
    }
}
