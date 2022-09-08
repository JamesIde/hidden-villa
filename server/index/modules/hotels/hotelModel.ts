export interface HotelModel {
  roomId?: number
  name: string
  price: number
  description: string
  numbeOfBeds: string
  maxGuests: number
  images: Image[]
}

export interface Image {
  id?: number
  url: string
  hotelRoomId: number
  hotelRoom: HotelModel
}
