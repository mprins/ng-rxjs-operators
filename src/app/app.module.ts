// Angular Stuff
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// Components
import {MainComponent} from './main/main.component';
import {MovieComponent} from './movie/movie.component';
import {ForkJoinComponent} from './fork-join/fork-join.component';

// Services
import {MovieService} from "./shared/services/movie.service";

// Router
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {DataService} from "./shared/services/data.service";
import { ConcatComponent } from './concat/concat.component';
import { MergeComponent } from './merge/merge.component';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { Movie2Component } from './movie2/movie2.component';
import { MapComponent } from './map/map.component';
import { FilterComponent } from './filter/filter.component';
import { ScanComponent } from './scan/scan.component';

@NgModule({
	declarations: [
		MovieComponent,
		ForkJoinComponent,
		MainComponent,
		ConcatComponent,
		MergeComponent,
		MergeMapComponent,
		Movie2Component,
		MapComponent,
		FilterComponent,
		ScanComponent
	],
	imports     : [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(AppRoutes),
        ReactiveFormsModule
	],
	providers   : [MovieService, DataService],
	bootstrap   : [MainComponent]
})
export class AppModule {
}
