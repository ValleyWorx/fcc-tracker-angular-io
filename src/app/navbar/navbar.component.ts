import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  visible:boolean;
  isCollapsed:boolean;

  ngOnInit() {

    this.visible = true;
    this.isCollapsed = true;

  }

  /*toggleNav(){

    if (!this.visible){
      document.getElementById("navbarFCC").style.display = "block";
      this.visible = true;
    } else {
      document.getElementById("navbarFCC").style.display = "none";
      this.visible = false;
    }
  }*/

}
