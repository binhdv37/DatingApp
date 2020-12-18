import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../model/User';
import {AcountService} from '../_services/acount.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AcountService,
              private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(
      response => {
        console.log(response);
        this.cancel();
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
