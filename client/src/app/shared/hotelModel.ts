export interface BookingInfo {
  checkIn?: string;
  checkOut?: string;
  NoGuests: number;
  duration: number;
  originalCheckIn?: Date;
  originalCheckOut?: Date;
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

export interface Booking {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  duration: number;
  roomId: number;
  roomName: string;
  roomPrice: number;
  totalCost: number;
  NoGuests: number;
  userID: number;
}

export interface Image {
  id?: number;
  image: string;
  hotelRoomId: number;
  hotelRoom: HotelRoom;
}
