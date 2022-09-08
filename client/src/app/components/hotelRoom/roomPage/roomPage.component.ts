import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { HotelRoom } from 'src/app/shared/HotelInfoModel';

@Component({
  selector: 'app-room-page',
  templateUrl: './roomPage.component.html',
  styleUrls: ['./roomPage.component.css'],
})
export class RoomPageComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService) {}
  selectedRoom!: Subscription;
  room!: HotelRoom;

  ngOnInit(): void {
    this.selectedRoom = this.roomService.selectedRoom.subscribe(
      (room) => (this.room = room)
    );
  }
  ngOnDestroy(): void {
    this.selectedRoom.unsubscribe();
  }
}
