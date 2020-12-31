import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMamagementComponent } from './user-mamagement.component';

describe('UserMamagementComponent', () => {
  let component: UserMamagementComponent;
  let fixture: ComponentFixture<UserMamagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMamagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMamagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
