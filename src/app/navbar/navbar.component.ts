import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild("needsCollapse") needsCollapse;

  constructor(public authService:AuthService,
              private router:Router) { }

  //isCollapsed:boolean;

  // (click)="needsCollapse.toggle()"
  // [mdbCollapse]="isSCollapsed" #needsCollapse="bs-collapse"

  /*  <button class="navbar-toggler">
      <span class="navbar-toggler-icon">
        <i class="fa fa-navicon"></i>
      </span>
    </button>
    */

  ngOnInit() {

  }


  /*
      showBsCollapse() {}

      shownBsCollapse() {}

      hideBsCollapse() {}

      hiddenBsCollapse() {}
      */

}
