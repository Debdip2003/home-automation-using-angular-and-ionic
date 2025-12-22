import { TestBed } from '@angular/core/testing';

import { RoomData } from '../room-data';

describe('RoomData', () => {
  let service: RoomData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
