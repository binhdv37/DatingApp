import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Member} from '../_models/member';
import {of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {PaginatedResult} from '../_models/pagination';
import {UserParams} from '../_models/userParams';
import {AcountService} from './acount.service';
import {User} from '../_models/user';
import {getPaginatedResult, getPaginationHeaders} from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AcountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user); // khởi tạo giá trị userparams khi lần đầu component dc gọi (page=1, pageSize=5)
    });
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params;
  }

  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  // getMembers() {
  //   if (this.members.length > 0) { return of(this.members); } // return members property as observable
  //   return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
  //     map (members => {
  //       this.members = members;
  //       return members;
  //     })
  //   );
  // }

  // trả về Observale<PaginatedResult<Member[]>>

  getMembers(userParams: UserParams){
    // tim trong cache xem co data k
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response){
      return of(response); // return response as observable
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender.toString());
    params = params.append('orderBy', userParams.orderBy.toString());

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );

}

  getMember(username: string){
    // [...this.memberCache.values()] : 1 array of array.
    console.log([...this.memberCache.values()]);
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member){
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber, pageSize){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }

}
