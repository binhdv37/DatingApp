import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';
import {ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        }
      )
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map( (user: User) => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }

  // tslint:disable-next-line:typedef
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }


}
