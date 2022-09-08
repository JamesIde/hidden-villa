import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { HotelRoom } from 'src/app/shared/HotelInfoModel';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService) {}
  bookingSubscription!: Subscription;
  roomSubscription!: Subscription;
  rooms!: HotelRoom[];
  isError!: boolean;
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    // Access booking info
    this.bookingSubscription = this.roomService.bookingInfo.subscribe(
      (data) => {
        console.log('booking (data not used yet): ', data);
      }
    );
    // Access available rooms
    this.roomSubscription = this.roomService.availableRooms.subscribe(
      (rooms) => {
        this.rooms = rooms;
        // console.log('Rooms: ', rooms);
        this.isLoading = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }
}
