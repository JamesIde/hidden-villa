// Declare all components
// Import routing
// Bring into app.module

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { HotelRoomRoutingModule } from './hotelRoom-routing.module';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  declarations: [RoomsComponent],
  imports: [
    HotelRoomRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
  ],
  providers: [RoomService],
})
export class HotelRoomModule {}
