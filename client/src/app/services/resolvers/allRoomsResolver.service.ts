import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HotelRoom } from '../../shared/hotelModel';
import { RoomService } from '../room.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableRoomResolver implements Resolve<HotelRoom[]> {
  constructor(private roomService: RoomService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): HotelRoom[] | Observable<HotelRoom[]> | Promise<HotelRoom[]> {
    return this.roomService.getallRooms();
  }
}
