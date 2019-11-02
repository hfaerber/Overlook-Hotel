class User {
  constructor(user, myBookings, roomData) {
    this.name = user.name;
    this.id = user.id;
    this.myBookings = myBookings;
    this.roomData = roomData;
  }

getMySpending() {
  return this.myBookings.reduce((acc, booking) => {
    this.roomData.forEach(room => {
      if (booking.roomNumber === room.number) {
        acc += room.costPerNight;
      }
    })
    return acc
  }, 0)
}

}

export default User;
