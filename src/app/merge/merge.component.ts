import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/services/data.service";

@Component({
	selector   : 'merge',
	templateUrl: './merge.component.html'
})
export class MergeComponent implements OnInit {

	mergeData: any[] = [];

	constructor(private dataService: DataService) {
	}

	ngOnInit() {
		this.dataService.getMergeData()
			.subscribe(res => {
				this.mergeData.push(res)
			})
	}

}
