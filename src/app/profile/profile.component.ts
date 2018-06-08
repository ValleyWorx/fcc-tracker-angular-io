import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { environment } from '../../environments/environment';
import { AuthService} from '../services/auth.service';

export interface Tower {
  done:number;
  total:number;
  type:string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public towers: Tower[] = [];
  public isLoading: boolean = true;

  constructor(
    private rest:RestService,
    public auth:AuthService
  ) { }

  ngOnInit() {
    this.rest.get(`${environment.apiURL}/user/scrape`)
    .then( (res) => {

      for(let tower of res.result){
        this.towers.push(tower);
      }

      console.log(this.towers);

      this.isLoading = false;
    }).catch( (err) => {
      console.log(err);
    });
  }

}
