const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Booking';

describe('Booking', () => {

  let booking;
  let userID = 7;
  let date = '2019/10/29';
  let roomNumber = 5;
  beforeEach(() => {
    booking = new Booking(userID, date, roomNumber);
  });

  it('should have expected properties', () => {
    expect(booking.userID).to.equal(userID);
    expect(booking.date).to.equal(date);
    expect(booking.roomNumber).to.equal(roomNumber);
  })

})
