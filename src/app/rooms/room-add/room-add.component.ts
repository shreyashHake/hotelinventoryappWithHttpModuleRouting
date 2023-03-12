import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'taj-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})

export class RoomAddComponent implements OnInit {
  room : RoomList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0
  }

  successMessage: string = '';

  constructor(private roomService : RoomsService) {
  }
  ngOnInit(): void {

  }

  addRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((room) => {
      this.successMessage = 'Room added succesfully';
      roomsForm.reset(
        {
          roomNumber: '',
          roomType: '',
          amenities: '',
          checkInTime: new Date(),
          checkOutTime: new Date(),
          photos: '',
          price: 0
        }
      );
    })
  }
}
