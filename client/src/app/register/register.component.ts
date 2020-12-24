import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../_models/user';
import {AcountService} from '../_services/acount.service';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AcountService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router) {
  }


  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required,
    //     Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    // });

    this.registerForm = this.fb.group({
      gender: ['male'], // mac dinh mail
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  // truy cap vao form, kiem tra xem confirmPassword co match voi password k
  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => { // control o day la FormControl object dai dien cho password field
      return control?.value === control?.parent?.controls[matchTo].value // control.parent.controls[<ten truong>] : truy cap vao bat ki truong nao
        ? null : {matchHayK: true}; // neu match thi return null, k thi return 1 error object bat ki
    };
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(
      response => {
        this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
