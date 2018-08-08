import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatloginComponent } from './chatlogin.component';

describe('ChatloginComponent', () => {
  let component: ChatloginComponent;
  let fixture: ComponentFixture<ChatloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
