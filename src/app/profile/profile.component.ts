import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { environment } from '../../environments/environment';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public stuff: any[] = [];
  public isLoading: boolean = true;

  constructor(
    private rest:RestService,
    public auth:AuthService
  ) { }

  ngOnInit() {
    this.rest.get(`${environment.apiURL}/user/scrape`)
    .then( (res) => {
      console.log(res);
      this.stuff = res.result;

      this.isLoading = false;
    }).catch( (err) => {
      console.log(err);
    });
  }

}
