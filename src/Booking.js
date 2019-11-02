class Booking {
  constructor (userID, date, roomNumber) {
    this.userID = userID;
    this.date = date;
    this.roomNumber = roomNumber;
    this.id = Date.now();
    this.roomServiceCharges = [];
  }
}

export default Booking;
