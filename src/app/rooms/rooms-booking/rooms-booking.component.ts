import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';

@Component({
  selector: 'taj-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})

export class RoomsBookingComponent implements OnInit {

  // by subscribing to an sevice (caused memory leak problems . . . )
  roomId : number | string = 0;

  constructor(private router : ActivatedRoute) {}

  // without subscribing :
  roomId$ = this.router.params.pipe(map((params) => params['roomId']));

  // without subscribing for multiple parameters we need to use paramMap
  roomId2$ = this.router.paramMap.pipe(map((param) => param.get('roomId')));

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.roomId = params['roomId'];
      console.log(this.roomId);
    });
  }
}
