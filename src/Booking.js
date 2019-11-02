class Booking {
  constructor (userID, date, roomNumber) {
    this.id = Date.now();
    this.userID = userID;
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomServiceCharges = [];
  }
}

export default Booking;
