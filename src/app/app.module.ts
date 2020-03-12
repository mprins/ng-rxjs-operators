// Angular Stuff
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// Components
import {AppComponent} from './app.component';
import {MovieComponent} from './movie/movie.component';
import {ForkJoinComponent} from './fork-join/fork-join.component';

// Services
import {MovieService} from './shared/services/movie.service';

// Router
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';
import {DataService} from './shared/services/data.service';
import {ConcatComponent} from './concat/concat.component';
import {MergeComponent} from './merge/merge.component';
import {MergeMapComponent} from './merge-map/merge-map.component';
import {Movie2Component} from './movie2/movie2.component';
import {MapComponent} from './map/map.component';
import {FilterComponent} from './filter/filter.component';
import {ScanComponent} from './scan/scan.component';
import {ProgressiveEnhancementComponent} from './progressive-data-enhancement/progressive.enhancement/progressive.enhancement.component';
import { BasicStreamComponent } from './streams/basic-stream/basic-stream.component';
import { MultipleStreamComponent } from './streams/multiple-stream/multiple-stream.component';
import { DragDropStreamComponent } from './streams/drag-drop-stream/drag-drop-stream.component';
import { TypeaheadStreamComponent } from './streams/typeahead-stream/typeahead-stream.component';

@NgModule({
  declarations: [
    MovieComponent,
    ForkJoinComponent,
    AppComponent,
    ConcatComponent,
    MergeComponent,
    MergeMapComponent,
    Movie2Component,
    MapComponent,
    FilterComponent,
    ScanComponent,
    ProgressiveEnhancementComponent,
    BasicStreamComponent,
    MultipleStreamComponent,
    DragDropStreamComponent,
    TypeaheadStreamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [MovieService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
