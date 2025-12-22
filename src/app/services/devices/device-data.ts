import { Injectable } from '@angular/core';
import { Device } from '../../interface/device';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeviceData {
  constructor(private httpClient: HttpClient) {}

  fetchDeviceByRoomId(roomId: number | string) {
    return this.httpClient.get<Device[]>(
      `http://localhost:3000/devices?room_id=${roomId}`
    );
  }

  addDevice(device: Device) {
    return this.httpClient.post<Device[]>(
      'http://localhost:3000/devices',
      device
    );
  }

  updateDeviceStatus(deviceId: number, newStatus: boolean) {
    console.log(deviceId, newStatus);

    return this.httpClient.patch(`http://localhost:3000/devices/${deviceId}`, {
      status: newStatus,
    });
  }
}
