import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadRoomResolver } from 'src/app/services/resolvers/singleRoomResolver.service';
import { AvailableRoomResolver } from 'src/app/services/resolvers/allRoomsResolver.service';
import { RoomsComponent } from './roomsList/rooms.component';
import { BookRoomComponent } from './bookRoom/bookRoom.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    // resolve: [AvailableRoomResolver],
  },
  {
    path: 'room/:id',
    component: BookRoomComponent,
    resolve: [LoadRoomResolver],
  },
  {
    path: 'profile/booking/:paymentID',
    component: OrderComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoomRoutingModule {}
