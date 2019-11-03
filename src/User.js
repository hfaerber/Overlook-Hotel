// import postBooking from './src/index.js'
import Booking from '../src/Booking';

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
    this.mySpending = this.myBookings.reduce((acc, booking) => {
      tapeChart.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          acc += room.costPerNight;
        }
      })
      return acc
    }, 0).toFixed();
    return this.mySpending;
  }

  makeBooking (date, roomNumber) {
    let numberRoomNumber = Number(roomNumber);
    let booking = new Booking(this.id, date, numberRoomNumber);
    return booking;
  }

}

export default User;
