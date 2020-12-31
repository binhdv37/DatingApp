import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Member} from '../_models/member';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MembersService} from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})

export class MemberDetailedResolver implements Resolve<Member>{

  constructor(private memberService: MembersService) {
  }

  // preload data , khi router navigate 1 componenet, data ma ham resolve nay return se dc preload, trước khi template dc construct
  // data trả về có thể dc truy cập = cách : this.route.data.subscribe(data => {//do something with data});
  // route ở trên là object kiểu ActivatedRoute
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memberService.getMember(route.paramMap.get('username')); // k can subscribe, tu router subscribe
  }
}
