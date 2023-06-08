import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {

  successMsg: string = '';

  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    rating: 0
  }

  constructor(private roomService: RoomsService) {

  }

  addRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMsg = 'Room Added Successfully';
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        price: 0,
        photos: '',
        checkInTime: new Date(),
        checkOutTime: new Date(),
        rating: 0
      });
    })
  }

  resetForm(roomsForm: NgForm) {
    roomsForm.resetForm({
      roomType: '',
      amenities: '',
      price: 0,
      photos: '',
      checkInTime: new Date(),
      checkOutTime: new Date(),
      rating: 0
    });
  }



}
