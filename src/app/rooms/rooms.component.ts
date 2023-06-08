import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';

import { RoomList, Rooms } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { Head, Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { RoomsService } from './services/rooms.service';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {

  hotelName = "ABC Hotel"

  NoOfRooms = 10;

  hide = true;

  selectedRoom!: RoomList;

  title = 'Room List';

  totalBytes = 0;

  rooms: Rooms = {
    totalRooms: 20,
    availabelRooms: 10,
    bookedRooms: 5
  }

  roomList: RoomList[] = []

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    observer.next('error');
  })

  // @ViewChild(HeaderComponent, { static: true }) headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return of([])
    }
    )
  );

  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  priceFilter = new FormControl(0);

  price: number = this.priceFilter.value as number;

  constructor(@SkipSelf() private roomService: RoomsService, private configService: ConfigService) { }

  ngOnInit(): void {
    // console.log(this.headerComponent);
    // this.roomList = this.roomService.getRooms();
    // console.log(this.roomService.getRooms());

    this.roomService.getPhotos().subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);

        }
      }

    })

    // this.subscription = this.roomService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // })
    console.log(this.roomList);

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (err) => console.log('error')
    })
    this.stream.subscribe(data => {
      console.log(data);
    })

  }

  // ngDoCheck(): void {
  //   console.log('on change is called');

  // }

  // ngAfterViewInit(): void {
  //   // console.log(this.headerComponent);
  //   // this.headerComponent.title = "Rooms View";
  //   // console.log(this.headerChildrenComponent);
  //   // this.headerChildrenComponent.last.title = "Last View"

  // }

  // ngAfterViewChecked(): void {
  //   // this.headerComponent.title = "Rooms View";
  // }

  toggle() {
    this.hide = !this.hide;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    console.log(room);
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '104',
      roomType: "Deluxe",
      amenities: "Air Conditioner",
      price: 500,
      photos: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      checkInTime: new Date('13-May-2023'),
      checkOutTime: new Date('14-May-2023'),
      rating: 4.5
    }
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomService.addRoom(room).subscribe(data => {
      this.roomList = data;
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: "Deluxe",
      amenities: "Air Conditioner",
      price: 500,
      photos: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      checkInTime: new Date('13-May-2023'),
      checkOutTime: new Date('14-May-2023'),
      rating: 4.5
    }
    this.roomService.editRoom(room).subscribe(data => {
      this.roomList = data
    })
  }

  deleteRoom() {
    this.roomService.deleteRoom('3').subscribe(data => {
      this.roomList = data;
    })
  }

  ngOnDestroy(): void {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }


}

//without RxJS - pull request
//getData -> addData -> getData

//RxJS uses push request
//getData -> continuos stream of data -> addData to stream of data 
