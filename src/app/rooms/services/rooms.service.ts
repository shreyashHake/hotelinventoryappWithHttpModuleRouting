import { Inject, Injectable, OnInit } from '@angular/core';
import { RoomList, Todo } from '../rooms';
import { environment } from '../../../environments/environment';
import { APP_SERVICE_CONFIG } from '..//..//AppConfig/appconfig.services';
import { AppConfig } from '..//..//AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [];
  todo: Todo[] = [];


  constructor(
    @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,

    private http: HttpClient
  ) {
    // console.log(environment.apiEndpoint); // directily assinging . . .
    console.log(this.appConfig.apiEndpoint);
    console.log('Rooms services is called Globally!');
  }

  // to demo share replay :
  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  

  /** getRooms : property and $ : indicates that it is a stream */

  // Injecting HttpHeader

  /** before adding Http Interceptor : the header will be get added from http interceptor  */
  // headers = new HttpHeaders({'token' : '1234rxjs44523'})

  // getRooms$ = this.http.get<RoomList[]>('/api/rooms', {
  //   headers : this.headers,
  // }).pipe
  // (
  //   shareReplay(1)
  // );

  /** After adding Http Interceptor  */

  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  )

  /** Http failure response for http://localhost:4200/api/room: 404 Not Found
      getRooms$ = this.http.get<RoomList[]>('/api/room').pipe(
        shareReplay(1)
        )
    */

  addRoom(room: RoomList) {
    /** before adding Http Interceptor  */
    // return this.http.post<RoomList[]>('/api/rooms', room, {
    //   headers: this.headers,
    // });

    /** After adding http interceptor */
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );

    return this.http.request(request);
  }
}
