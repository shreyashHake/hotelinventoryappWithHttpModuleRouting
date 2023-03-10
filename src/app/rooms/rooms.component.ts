import { HttpEventType } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'taj-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  hotelName: string = 'Taj Hotels';
  numberOfRooms: number = 10;

  hideRooms: boolean = true;
  title: string = 'Taj Hotel';
  selectedRoom!: RoomList;

  // Dependency Enjection : now we can call services inside ngOnIt()
  constructor(@SkipSelf() private roomService: RoomsService) { }

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  // @ViewChild(HeaderComponent, {static: true}) headerComponent!: HeaderComponent; /** by default the static is 'false' and so we can not use it in ngOnInit() to reduce error */
  // * @ViewChild() :
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  // * @ViewChildren() :
  @ViewChildren(HeaderComponent) headerComponents!: QueryList<HeaderComponent>;

  ngAfterViewInit(): void {
    // * @ViewChild() :
    console.log('From view child : ' + this.headerComponent);
    this.headerComponent.title = this.title;

  }

  ngAfterViewChecked() {
  }

  // Http Module :
  roomList: RoomList[] = [];

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  totalBytes = 0;
  subscription !: Subscription;

  // with no subscription so we can modify it
  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  ngOnInit(): void {
    // Subscribing using http module service :
    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }

        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }

        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }

        case HttpEventType.ResponseHeader: {
          console.log('Request Sucess');
          break;
        }
      }
    });

    this.stream.subscribe((data) => {
      console.log(data);
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: (err) => console.log(err),
    });

    this.subscription = this.roomService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '5',
      roomType: 'Delux Room',
      amenities: 'AC, TV',
      price: 3489,
      photos: 'World',
      checkInTime: new Date('16-Jan-2020'),
      checkOutTime: new Date('19-Jan-2020'),
    };
    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Edited room',
      amenities: 'AC, TV, Modified PS5',
      price: 6789,
      photos: 'Russia Ukrain war',
      checkInTime: new Date('16-Jan-2020'),
      checkOutTime: new Date('19-Jan-2020'),
    };

    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }
}
