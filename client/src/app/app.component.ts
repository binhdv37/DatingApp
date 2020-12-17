import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './model/User';
import {AcountService} from './_services/acount.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Dating app';
  users: any;

  constructor(private accountService: AcountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  // tslint:disable-next-line:typedef
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
  }

}
