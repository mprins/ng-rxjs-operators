import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/services/data.service";

@Component({
	selector   : 'fork-join',
	templateUrl: './fork-join.component.html'
})
export class ForkJoinComponent implements OnInit {

	forkJoinData;

	constructor(private dataService: DataService) {

	}

	ngOnInit() {
		this.dataService.getForkJoinData()
			.subscribe((data: any) => {
				this.forkJoinData = data;
			})
	}

}
