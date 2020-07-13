// Routing stuff
import {Routes} from '@angular/router';

// Components

// Basic, client-sided streams
import {BasicStreamComponent} from './streams/basic-stream/basic-stream.component';
import {MultipleStreamComponent} from './streams/multiple-stream/multiple-stream.component';
import {DragDropStreamComponent} from './streams/drag-drop-stream/drag-drop-stream.component';

// Operators
import {MovieComponent} from './operators/movie/movie.component';
import {ForkJoinComponent} from './operators/fork-join/fork-join.component';
import {ConcatComponent} from './operators/concat/concat.component';
import {MergeComponent} from './operators/merge/merge.component';
import {MergeMapComponent} from './operators/merge-map/merge-map.component';
import {Movie2Component} from './operators/movie2/movie2.component';
import {MapComponent} from './operators/map/map.component';
import {FilterComponent} from './operators/filter/filter.component';
import {ScanComponent} from './operators/scan/scan.component';
import {ProgressiveEnhancementComponent} from './operators/progressive-data-enhancement/progressive.enhancement/progressive.enhancement.component';
import {TypeaheadStreamComponent} from './streams/typeahead-stream/typeahead-stream.component';
import {Movie3Component} from "./operators/movie3/movie3.component";

export const AppRoutes: Routes = [
  // homepage
  {path: '', redirectTo: 'stream', pathMatch: 'full'},
  // basic streams
  {path: 'stream', component: BasicStreamComponent},
  {path: 'stream-multiple', component: MultipleStreamComponent},
  {path: 'drag-drop', component: DragDropStreamComponent},
  {path: 'typeahead', component: TypeaheadStreamComponent},

  // operators
  {path: 'map', component: MapComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'scan', component: ScanComponent},
  {path: 'concat', component: ConcatComponent},
  {path: 'forkjoin', component: ForkJoinComponent},
  {path: 'merge', component: MergeComponent},
  {path: 'mergemap', component: MergeMapComponent},
  {path: 'movie', component: MovieComponent},
  {path: 'movie2', component: Movie2Component},
  {path: 'movie3', component: Movie3Component},
  {path: 'progressive', component: ProgressiveEnhancementComponent},
  {
    // catch all route
    path: '**',
    redirectTo: 'map'
  },
];
