import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../shared/services/movie.service";
import {forkJoin, Observable, of} from "rxjs";
import {delay, mergeMap} from "rxjs/operators";

@Component({
  selector: 'movie2',
  templateUrl: './movie2.component.html'
})
export class Movie2Component {
  movies: any[];

  constructor(private movieService: MovieService) {

  }

  // GOAL: I want to retrieve movie titles first,
  // and then details for every movie in the list.


  // First Attempt: Simply search for movies and once movies are found,
  // fire another request for details for every movie.
  // Code smell: a subscribe-inside-a-subscribe block. But it works!
  // searchMoviesWithDetails(keyword) {
  // 	this.movieService.getMoviesSimple(keyword)
  // 		.subscribe(movies => {
  // 			// get movie master values
  // 			this.movies = movies;
  //
  // 			// get movie details. This should be combined w/ previous call
  // 			this.movies.map(movie => {
  // 				this.movieService.getMovieDetails(movie.imdbID)
  // 					.delay(1000) // simulate delay
  // 					.subscribe(movieDetails => {
  // 						console.log(movieDetails);
  // 						movie.details = movieDetails;
  // 					})
  // 			})
  // 		});
  // }

  // Second attempt. Better, b/c only 1 subscribe-block at the bottom.
  // Not perfect though, as I feel it is overly complicated with a
  // .forkJoin() inside a .mergeMap().
  // Sincere question: Can this be optimized?
  searchMoviesWithDetails(keyword) {
    this.movieService.getMoviesSimple(keyword)
      .pipe(
        mergeMap((movies: any[]) => {
          if (movies) {
            // 1. assing found movies to this.movies.
            this.movies = movies;
            return forkJoin(
              // 2. Loop over every movie in collection, get details (i.e. perform 10 additional requests and join them)
              // 3. I would LIKE to have a function here that emits as soon as one detailObject for a movie is fetched.
              movies.map((movie: any) => {
                return this.movieService.getMovieDetails(movie.imdbID)
              })
            )
          } else {
            // 4. no movies found with this keyword. Return empty array
            return of([])
          }
        }),
        delay(2000)// 5. simulate delay
      )
      .subscribe((movieDetails: any) => {
        // 6. Add the found details to the current movie.
        // I would like to do this on a movie-by-movie base, instead of retrieving an array w/ 10 movieDetail
        // objects. See also 3.)
        movieDetails.forEach(detailObject => {
          let currentMovie = this.movies.find(movie => movie.imdbID === detailObject.imdbID);
          currentMovie.details = detailObject;
        });
      });
  }

  // Clear movie list
  clear() {
    this.movies = null;
  }
}
