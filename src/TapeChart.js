class TapeChart {
  constructor(users, rooms, bookings) {
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
  }

getAvailableRoomsByDate(date) {
    let availableByDate = this.rooms.reduce((acc, room) => {
      let bookingsByRoom = this.bookings.filter(booking =>
        Number(booking.roomNumber) === room.number);
      if (!bookingsByRoom.some(booking => booking.date === date)) {
        acc.push(room);
      }
        return acc;
    }, [])
  return availableByDate;
}

getOccupancy(date) {
  return 100 - (this.getAvailableRoomsByDate(date).length
    / this.rooms.length * 100);
}

getBookingsByDate(date) {
  return this.bookings.filter(booking => booking.date === date);
}

getDaysRevenue(date) {
  let bookingsByDate = this.getBookingsByDate(date);
  return bookingsByDate.reduce((acc, booking) => {
    this.rooms.forEach(room => {
      if (room.number === Number(booking.roomNumber)) {
        acc += room.costPerNight;
      }
    })
    return acc;
  }, 0)
}

filterAvailableRoomsByFeature(date, feature, spec) {
  let availableRoomsByDate = this.getAvailableRoomsByDate(date);
  return availableRoomsByDate.filter(room => room[feature] === spec);
}

}

export default TapeChart;
