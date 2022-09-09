export interface BookingInfo {
  checkIn: string;
  checkout: string;
  NoGuests: number;
}

export interface HotelRoom {
  roomId?: number;
  name: string;
  price: number;
  description: string;
  numberOfBeds: string;
  maxGuests: number;
  images: Image[];
}

export interface Image {
  id?: number;
  image: string;
  hotelRoomId: number;
  hotelRoom: HotelRoom;
}
