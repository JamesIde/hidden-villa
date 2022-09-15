export interface BookingInfo {
  checkIn?: string;
  checkOut?: string;
  NoGuests: number;
  duration: number;
  originalCheckIn?: string;
  originalCheckOut?: string;
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
  checkIn: string;
  checkOut: string;
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
