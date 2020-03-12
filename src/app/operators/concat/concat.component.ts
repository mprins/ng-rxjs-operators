import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/services/data.service";

@Component({
	selector   : 'concat',
	templateUrl: './concat.component.html'
})
export class ConcatComponent implements OnInit {

	concatData:any[]=[];

	constructor(private  dataService: DataService) {
	}

	ngOnInit() {
		this.dataService.getConcatData()
			.subscribe((res: any) => {
				this.concatData.push(res)
			})
	}

}
