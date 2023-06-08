export interface Rooms {
    totalRooms: number,
    availabelRooms: number,
    bookedRooms: number
}

export interface RoomList {
    roomNumber?: string;
    roomType: string;
    amenities: string;
    price: number;
    photos: string;
    checkInTime: Date;
    checkOutTime: Date;
    rating: number;
}