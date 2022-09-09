import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { HotelRoom } from 'src/app/shared/HotelInfoModel';

@Component({
  selector: 'app-book-room',
  templateUrl: './bookRoom.component.html',
  styleUrls: ['./bookRoom.component.css'],
})
export class BookRoomComponent implements OnInit {
  constructor(private roomService: RoomService) {}
  selectedRoom!: Subscription;
  roomDetails!: HotelRoom;
  ngOnInit(): void {
    this.selectedRoom = this.roomService.selectedRoom.subscribe((room) => {
      console.log('Selected Room: ', room);
      this.roomDetails = room;
    });
  }
}
