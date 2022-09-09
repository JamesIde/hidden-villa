// Declare all components
// Import routing
// Bring into app.module

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { LoadingComponent } from '../auth/loading/loading.component';
import { HotelRoomRoutingModule } from './hotelRoom-routing.module';
import { RoomsComponent } from './roomsList/rooms.component';
import { RoomComponent } from './room/room.component';
import { BookRoomComponent } from './bookRoom/bookRoom.component';
@NgModule({
  declarations: [RoomsComponent, RoomComponent, BookRoomComponent],
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
