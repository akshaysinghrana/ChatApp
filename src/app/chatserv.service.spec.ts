import { TestBed, inject } from '@angular/core/testing';

import { ChatservService } from './chatserv.service';

describe('ChatservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatservService]
    });
  });

  it('should be created', inject([ChatservService], (service: ChatservService) => {
    expect(service).toBeTruthy();
  }));
});
