import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of'

@Injectable()
export class MovieService {
	url: string = 'http://www.omdbapi.com/?';

	constructor(private http: Http) {

	}

	// Used in Movie App: Return all movies, combined with movie details
	getMovies(keyword): Observable<any[]> {
		return this.http.get(this.url + `s=${keyword}`)
			.map(response => {
				return response.json().Search; // b/c actual movies are wrapped in a Search object
			})
			.mergeMap((movies: any[]) => {
				if (movies) {
					return Observable.forkJoin(
						// loop over every movie in collection, get details (i.e. perform 10 additional requests and join them)
						movies.map((movie: any) => {
							return this.getMovieDetails(movie.imdbID)
								.map(movieDetails => {
									// add the found details to the current movie
									movie.details = movieDetails;
									return movie;
								})
						})
					)
				} else {
					// no movies found with this keyword. Return empty array
					return Observable.of([])
				}
			})
	}

	// Used in Movie App 2: return all movies, then look up movie details and return them also. Composing is done in the component
	getMoviesSimple(keyword): Observable<any> {
		const movies =  this.http.get(this.url + `s=${keyword}`)
			.map(response => response.json().Search);

		// Problem : I want to look up details for every movie
		// and emit the details as they come available.
		// BUT: my list of movies (master) is already complete. I want
		// to emit that first and details later. Use merge? Or mergeMap?

		return Observable.merge(movies);
	}

	// Helper function
	getMovieDetails(id: string): Observable<any> {
		return this.http.get(this.url + `i=${id}`)
			.map(res => res.json())
	}
}