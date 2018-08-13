import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';

describe('ChatservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
