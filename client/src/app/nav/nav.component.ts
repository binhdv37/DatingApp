import { Component, OnInit } from '@angular/core';
import {AcountService} from '../_services/acount.service';
import {Observable} from 'rxjs';
import {User} from '../model/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AcountService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login(){
    this.accountService.login(this.model).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.accountService.logout();
  }

  // tslint:disable-next-line:typedef

}
