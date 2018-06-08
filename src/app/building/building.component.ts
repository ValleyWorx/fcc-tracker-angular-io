import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  @Input('progress') _progress:number;
  @Input('total') _total:number;

  constructor() { }

  private build1:boolean = false;
  private build2:boolean = false;
  private build3:boolean = false;
  private build4:boolean = false;
  private build5:boolean = false;

  ngOnInit() {
    let calculated = (this._progress/this._total)*100;

    if(calculated > 0){
      //show building 1
      this.build1 = true;
    }

    if (calculated > 25){
      //show building 2
      this.build2 = true;
    }

    if(calculated > 50){
      //show building 3
      this.build3 = true;
    }

    if(calculated > 75){
      //show building 4
      this.build4 = true;
    }

    if(calculated >= 100){
      //show building 5
      this.build5 = true;
    }
  }

}
