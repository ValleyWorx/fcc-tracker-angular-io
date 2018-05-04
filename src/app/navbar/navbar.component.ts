import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router) { }

  visible:boolean;
  isCollapsed:boolean;

  ngOnInit() {

    this.visible = true;
    this.isCollapsed = true;

  }

}
