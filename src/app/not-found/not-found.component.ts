import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  name :string = null;
  constructor() { }

  ngOnInit() {
  }

  checkNames(_name) : void {
    this.name = _name;

  }

}
