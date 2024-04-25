import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileeditComponent } from './userprofileedit.component';

describe('UserprofileeditComponent', () => {
  let component: UserprofileeditComponent;
  let fixture: ComponentFixture<UserprofileeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserprofileeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserprofileeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
