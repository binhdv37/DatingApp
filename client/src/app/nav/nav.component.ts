import { Component, OnInit } from '@angular/core';
import {AcountService} from '../_services/acount.service';
import {Observable} from 'rxjs';
import {User} from '../_models/user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AcountService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login(){
    this.accountService.login(this.model).subscribe(
      response => {
        this.router.navigateByUrl('/members');
      }
    );
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  // tslint:disable-next-line:typedef

}
