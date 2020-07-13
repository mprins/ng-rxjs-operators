import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, merge, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class MovieService {
  url = "http://www.omdbapi.com/?apikey=f1f56c8e&";

  constructor(private http: HttpClient) {}

  // ****************************
  // Solution 1.
  // Used in Movie App: Return all movies, combined with movie details.
  // This call has to wait until *all* subsequent http-calls for movie details have returnend.
  // Only then the final object can be composed and returnd.
  // ****************************
  getMovies(keyword): Observable<any[]> {
    return this.http.get(this.url + `s=${keyword}`).pipe(
      map((response: any) => {
        return response.Search; // b/c actual movies are wrapped in a Search object
      }),
      mergeMap((movies: any[]) => {
        if (movies) {
          return forkJoin(
            // loop over every movie in collection,
            // get details (i.e. perform 10 additional
            // requests and join them)
            movies.map((movie: any) => {
              return this.getMovieDetails(movie.imdbID).pipe(
                map((movieDetails) => {
                  // add the found details to the current movie
                  movie.details = movieDetails;
                  return movie;
                })
              );
            })
          );
        } else {
          // no movies found with this keyword. Return empty array
          return of([]);
        }
      })
    );
  }

  // ****************************
  // Solution 2.
  // Used in Movie App 2: return all movies, then look up movie details
  // and return them also. Composing is done in the component
  // ****************************
  getMoviesSimple(keyword): Observable<any> {
    const movies = this.http
      .get(this.url + `s=${keyword}`)
      .pipe(map((response: any) => response.Search));

    // Problem : I want to look up details for every movie
    // and emit the details as they come available.
    // BUT: my list of movies (master) is already complete. I want
    // to emit that first and details later. Use merge? Or mergeMap?
    return merge(movies);
  }

  // Helper function
  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(this.url + `i=${id}`);
  }
}
