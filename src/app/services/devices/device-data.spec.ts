import { TestBed } from '@angular/core/testing';

import { DeviceData } from './device-data';

describe('DeviceData', () => {
  let service: DeviceData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
