class TapeChart {
  constructor(users, rooms, bookings) {
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  getAvailableRooms(date, roomType) {
    let availableByDate = this.rooms.reduce((acc, room) => {
      let bookingsByRoom = this.bookings.filter(booking =>
        Number(booking.roomNumber) === room.number);
      if (!bookingsByRoom.some(booking => booking.date === date)) {
        acc.push(room);
      }
      return acc;
    }, []);
    if (roomType && roomType !== 'any') {
      return this.filterByRoomType(availableByDate, roomType);
    } else {
      return availableByDate;
    }
  }

  filterByRoomType(roomList, roomType) {
    return roomList.filter(room => room.roomType === roomType)
  }

  getOccupancy(date) {
    return 100 - (this.getAvailableRooms(date).length
      / this.rooms.length * 100).toFixed();
  }

  filterBookingsByMetric(metric, spec) {
    return this.bookings.filter(booking => booking[metric] === spec);
  }

  getDaysRevenue(metric, spec) {
    let bookingsByDate = this.filterBookingsByMetric(metric, spec);
    return Number(bookingsByDate.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (room.number === Number(booking.roomNumber)) {
          acc += room.costPerNight;
        }
      })
      return acc;
    }, 0).toFixed(2));
  }

  filterAvailableRoomsByFeature(date, feature, spec) {
    let availableRoomsByDate = this.getAvailableRooms(date);
    return availableRoomsByDate.filter(room => room[feature] === spec);
  }

  findUser(metric, spec) {
    return this.users.filter(user => user[metric] === spec);
  }

  findUserFromSearch(metric, spec) {
    return this.users.filter(user => user[metric].toLowerCase().includes(spec))
  }

  deleteBooking(booking) {
    let numberBooking = Number(booking);
    return { id: numberBooking };
  }

}

export default TapeChart;
