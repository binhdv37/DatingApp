import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AcountService} from '../_services/acount.service';
import {take} from 'rxjs/operators';
import {User} from '../_models/user';

@Directive({
  selector: '[appHasRole]' // *appHasRole="['role1', 'role2']" : phai co role1 hoac role2
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];
  user: User;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private accountService: AcountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    // clear view if no roles or no user
    if (!this.user?.roles || this.user == null){
      this.viewContainerRef.clear();
      return;
    }

    // soat 1 luot cac role user so huu, kiem tra xem co it nhat 1 role thuoc vao appHasRole k, neu co thi return true ngay.
    if (this.user?.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainerRef.clear();
    }
  }

}
