import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { HotelRoom } from 'src/app/shared/HotelInfoModel';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @Input() room!: HotelRoom;
  constructor() {}

  ngOnInit(): void {}
}
