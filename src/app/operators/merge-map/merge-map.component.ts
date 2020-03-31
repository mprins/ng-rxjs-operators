import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'merge-map',
  templateUrl: './merge-map.component.html'
})
export class MergeMapComponent implements OnInit {

  authorId = 0;
  mergeMapData: any[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

  }

  setAuthorID() {
    this.dataService.getMergeMapData(+this.authorId)
      .subscribe((result: any) => {
        this.mergeMapData = result;
      });
  }
}
