// Routing stuff
import {Routes} from "@angular/router";

// Components
import {MovieComponent} from "./movie/movie.component";
import {ForkJoinComponent} from "./fork-join/fork-join.component";
import {ConcatComponent} from "./concat/concat.component";
import {MergeComponent} from "./merge/merge.component";
import {MergeMapComponent} from "./merge-map/merge-map.component";
import {Movie2Component} from "./movie2/movie2.component";

export const AppRoutes: Routes = [
	{path: '', redirectTo: 'concat', pathMatch: 'full'},
	{path: 'concat', component: ConcatComponent},
	{path: 'forkjoin', component: ForkJoinComponent},
	{path: 'merge', component: MergeComponent},
	{path: 'mergemap', component: MergeMapComponent},
	{path: 'movie', component: MovieComponent},
	{path: 'movie2', component: Movie2Component},
	{
		// catch all route
		path      : '**',
		redirectTo: 'concat'
	},
];