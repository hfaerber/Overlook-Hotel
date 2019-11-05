class User {
  constructor(user, tapeChart) {
    this.name = user.name;
    this.id = user.id;
    this.myBookings = this.getMyBookings(tapeChart);
    this.mySpending = this.getMySpending(tapeChart);
  }

  getMyBookings(tapeChart) {
   this.myBookings = tapeChart.bookings.filter(booking =>
     booking.userID === this.id)
     return this.myBookings;
  }

  getMySpending(tapeChart) {
    this.mySpending = Number(this.myBookings.reduce((acc, booking) => {
      tapeChart.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          acc += room.costPerNight;
        }
      })
      return acc
    }, 0).toFixed());
    return this.mySpending;
  }

  getBookingIDs() {
    return this.myBookings.map(booking => booking.id)
  }

  makeBooking (date, roomNumber) {
    let numberRoomNumber = Number(roomNumber);
    return { userID: this.id, date: date, roomNumber: numberRoomNumber};
  }

  deleteBooking(booking) {
    let numberBooking = Number(booking);
    return { id: numberBooking};
  }

}

export default User;
