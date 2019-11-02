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
  }, 0)
  return this.mySpending;
}

// index.js when selects date, fire tapeChart.getAvailableRoomsByDate() and display
// if this function is invoked on user clicking given room, then i wouldn't
// need the conditional to check if that room is available
// based on select room, room # and date will autopopulate
makeBooking (date, roomNumber) {
  let booking = new Booking(this.id, date, roomNumber);
  return booking;
}

// return bookingobj
// instantiate new booking
// let newBooking = new Booking(this.id, date, roomNumber)
// return newBooking
// invoke postBooking (object to post)
// does the getMySpending need to calc past vs future?

// PSUEDOCODING
// select date - Dom
// see what rooms available for date - tapeChart
// select room from the available rooms
// create Booking obj {roomNumber: 1 } - user
// fetch POST that bookingobj
// update tapechart stats
// update user stats



// Could have a getMyBookings method that takes TapeChart
// instantiation as an arg then does the calculations here
// within User which might be a little more SRP

// could have a method for update bookings for after posting
// date.  This could be in tapeChart and update the tapeCharts
// this.bookings property then reinvoke the user's getMyBookings
// method to update the users myBookings property.


}

export default User;
