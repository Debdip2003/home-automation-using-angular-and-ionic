import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Room } from 'src/app/interface/room';

@Injectable({
  providedIn: 'root',
})
export class RoomData {
  private httpClient = inject(HttpClient);

  constructor() {}

  fetchRoom() {
    return this.httpClient.get<Room[]>('http://localhost:3000/rooms');
  }

  addRoom(room: Room) {
    return this.httpClient.post<Room[]>('http://localhost:3000/rooms', room);
  }

  deleteRoom(roomId: number | string | undefined) {
    return this.httpClient.delete(`http://localhost:3000/rooms/${roomId}`);
  }
}
