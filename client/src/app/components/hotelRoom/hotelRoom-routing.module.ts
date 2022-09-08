import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadRoomResolver } from 'src/app/services/singleRoomResolver.service';
import { AvailableRoomResolver } from 'src/app/services/allRoomsResolver.service';
import { RoomPageComponent } from './roomPage/roomPage.component';
import { RoomsComponent } from './roomsList/rooms.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    resolve: [AvailableRoomResolver],
  },
  {
    path: 'room/:id',
    component: RoomPageComponent,
    resolve: [LoadRoomResolver],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoomRoutingModule {}
