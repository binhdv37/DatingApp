import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models/user';
import {Member} from '../../_models/member';
import {AcountService} from '../../_services/acount.service';
import {MembersService} from '../../_services/members.service';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') myEditForm: NgForm; // lay form object ben html
  member: Member;
  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){ // khi form dirty => tao su kien => beforeunload event
    if (this.myEditForm.dirty){
      $event.returnValue = true;
    }
  }


  constructor(private accountService: AcountService,
              private memberService: MembersService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(
      member => {
        this.member = member;
      }
    );
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(
      () => {
        this.toastr.success('Profile updated successfully');
        this.myEditForm.reset(this.member); // báo angular coi giá trị member sau khi thay đổi là giá trị ban đầu
        // => form.dirty = false => k hiển thị dòng alert.
      }
    );

  }

}
