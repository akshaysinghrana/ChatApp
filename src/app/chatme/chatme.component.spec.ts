import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmeComponent } from './chatme.component';

describe('ChatmeComponent', () => {
  let component: ChatmeComponent;
  let fixture: ComponentFixture<ChatmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
