class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.myBookings = [];
    this.mySpending = 0;
  }

getMyBookings(tapeChart) {
 this.myBookings = tapeChart.bookings.filter(booking =>
   booking.userID === this.id)
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
}
// does the getMySpending need to calc past vs future?

// PSUEDOCODING
// Could have a getMyBookings method that takes TapeChart
// instantiation as an arg then does the calculations here
// within User which might be a little more SRP

// could have a method for update bookings for after posting
// date.  This could be in tapeChart and update the tapeCharts
// this.bookings property then reinvoke the user's getMyBookings
// method to update the users myBookings property.

passing tapeChart through as an arg on each method (not in the constructor) so
that I can re-run these two mo

}

export default User;
