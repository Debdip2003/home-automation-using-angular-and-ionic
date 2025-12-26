import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomDetailPage } from './room-detail.page';

describe('RoomDetailPage', () => {
  let component: RoomDetailPage;
  let fixture: ComponentFixture<RoomDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
