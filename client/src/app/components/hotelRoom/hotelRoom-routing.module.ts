import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    // TODO Load Rooms Resolver
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoomRoutingModule {}
