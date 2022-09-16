// Declare all components
// Import routing
// Bring into app.module

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { HotelRoomRoutingModule } from './hotelRoom-routing.module';
import { RoomsComponent } from './roomsList/rooms.component';
import { RoomComponent } from './room/room.component';
import { BookRoomComponent } from './bookRoom/bookRoom.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/loading/shared.module';
import { OrderComponent } from './order/order.component';
@NgModule({
  declarations: [
    RoomsComponent,
    RoomComponent,
    BookRoomComponent,
    OrderComponent,
  ],
  imports: [
    SharedModule,
    HotelRoomRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, RoomService],
})
export class HotelRoomModule {}
