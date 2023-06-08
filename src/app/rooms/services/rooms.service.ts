import { Injectable, Inject } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from '../../../environments/environment';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    console.log('Room service initialised');
    console.log(this.config.apiEndpoint);
  }

  roomList: RoomList[] = []

  getRooms$ = this.http.get<RoomList[]>('api/rooms').pipe(
    shareReplay(1)
  )

  getRooms() {
    // return this.roomList;
    return this.http.get<RoomList[]>('api/rooms')
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      requestProgress: true
    })

    return this.http.request(request);
  }

}
