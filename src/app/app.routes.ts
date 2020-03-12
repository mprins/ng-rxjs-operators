// Routing stuff
import {Routes} from '@angular/router';

// Components

// Basic, client-sided streams
import {BasicStreamComponent} from './streams/basic-stream/basic-stream.component';
import {MultipleStreamComponent} from './streams/multiple-stream/multiple-stream.component';
import {DragDropStreamComponent} from './streams/drag-drop-stream/drag-drop-stream.component';

// Operators
import {MovieComponent} from './movie/movie.component';
import {ForkJoinComponent} from './fork-join/fork-join.component';
import {ConcatComponent} from './concat/concat.component';
import {MergeComponent} from './merge/merge.component';
import {MergeMapComponent} from './merge-map/merge-map.component';
import {Movie2Component} from './movie2/movie2.component';
import {MapComponent} from './map/map.component';
import {FilterComponent} from './filter/filter.component';
import {ScanComponent} from './scan/scan.component';
import {ProgressiveEnhancementComponent} from './progressive-data-enhancement/progressive.enhancement/progressive.enhancement.component';
import {TypeaheadStreamComponent} from './streams/typeahead-stream/typeahead-stream.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  // streams
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
  {path: 'progressive', component: ProgressiveEnhancementComponent},
  {
    // catch all route
    path: '**',
    redirectTo: 'map'
  },
];
