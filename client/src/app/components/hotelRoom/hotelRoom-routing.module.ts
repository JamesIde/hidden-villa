import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableRoomResolver } from 'src/app/services/roomResolver.service';
import { RoomsComponent } from './roomsList/rooms.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    resolve: [AvailableRoomResolver],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoomRoutingModule {}
