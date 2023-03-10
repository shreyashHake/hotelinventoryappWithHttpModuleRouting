import { Component, OnInit, Input, Output, EventEmitter, DoCheck, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import { Room, RoomList } from '../rooms';

@Component({
  selector: 'taj-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, DoCheck, OnDestroy{

  @Input() rooms : RoomList[] = [];
  @Output() selectedRoom = new EventEmitter<RoomList>();
  @Input() title : string = '';

  constructor() {}
  ngOnDestroy(): void {
    console.log('on destroy is  called'); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if(changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    console.log('Do check is called');
  }

  selectRoom(room : RoomList) {
    this.selectedRoom.emit(room);
  }
}

