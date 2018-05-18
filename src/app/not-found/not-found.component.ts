import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  name :string = null;
  statement: string = null;


  constructor(
    private router: Router;
  ) {}

  ngOnInit() {
  }

  checkNames(_name) : void {
    this.name = _name;
    this.statement = "sending pink slip"
    setTimeout(()=> {
      this.name = null;
      this.statement = null;
      this.router.navigate(['']);
    }, 2000)
  }

}
