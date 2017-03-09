import {Component} from '@angular/core';
import {MovieService} from "../shared/services/movie.service";
import {Observable} from "rxjs";

@Component({
	selector   : 'movie-app',
	templateUrl: 'movie.component.html'
})
export class MovieComponent {

	movies: any[];
	currentMovie: any;

	constructor(private movieService: MovieService) {

	}

	// Return all movies
	searchMovies(keyword) {
		this.movieService.getMovies(keyword)
			.subscribe(movies => {
				this.movies = movies;
			});
	}

	// Show Movie details
	setMovie(movie) {
		this.currentMovie = movie;
	}

	// Hide movie details
	clear() {
		this.currentMovie = null;
	}
}
