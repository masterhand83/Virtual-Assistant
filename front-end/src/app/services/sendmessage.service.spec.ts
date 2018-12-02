import { TestBed, inject } from '@angular/core/testing';

import { SendmessageService } from './sendmessage.service';

describe('SendmessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendmessageService]
    });
  });

  it('should be created', inject([SendmessageService], (service: SendmessageService) => {
    expect(service).toBeTruthy();
  }));
});
