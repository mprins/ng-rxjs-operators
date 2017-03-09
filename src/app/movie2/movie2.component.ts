import {Component, OnInit} from '@angular/core';
import {MovieService} from "../shared/services/movie.service";

@Component({
	selector   : 'movie2',
	templateUrl: './movie2.component.html'
})
export class Movie2Component {
	movies: any[];

	constructor(private movieService: MovieService) {

	}

	// Return all movies
	searchMovies(keyword) {
		this.movieService.getMoviesSimple(keyword)
			.subscribe(movies => {
				// get movie master values
				this.movies = movies;

				// get movie details. This should be combined w/ previous call
				this.movies.map(movie => {
					this.movieService.getMovieDetails(movie.imdbID)
						.delay(1000) // simulate delay
						.subscribe(movieDetails => {
							console.log(movieDetails);
							movie.details = movieDetails;
						})
				})
			});
	}

	// Hide movie details
	clear() {
		this.movies = null;
	}
}
