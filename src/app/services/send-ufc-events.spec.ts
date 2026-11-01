import { TestBed } from '@angular/core/testing';
import { SendUfcEvents } from './send-ufc-events';

describe('SendUfcEvents', () => {
  let service: SendUfcEvents;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendUfcEvents);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
