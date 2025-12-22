import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from 'src/app/interface/room';

@Injectable({
  providedIn: 'root',
})
export class RoomData {
  constructor(private httpClient: HttpClient) {}

  fetchRoom() {
    return this.httpClient.get<Room[]>('http://localhost:3000/rooms');
  }

  addRoom(room: Room) {
    return this.httpClient.post<Room[]>('http://localhost:3000/rooms', room);
  }
}
