import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { HotelRoom } from 'src/app/shared/hotelModel';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService) {}
  @Input() room!: HotelRoom;
  bookingSub!: Subscription;
  duration!: number;

  ngOnInit(): void {
    this.bookingSub = this.roomService.bookingInfo.subscribe((booking) => {
      this.duration = booking?.duration
        ? booking?.duration
        : this.roomService.getBookingDuration();
    });
  }
  ngOnDestroy(): void {
    this.bookingSub.unsubscribe();
  }
}
