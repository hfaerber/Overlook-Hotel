const chai = require('chai');
const expect = chai.expect;

import userData from '../sampleData/sample-user-data';
import roomData from '../sampleData/sample-room-data';
import bookingData from '../sampleData/sample-booking-data';

import TapeChart from '../src/TapeChart';
import User from '../src/User';
import Booking from '../src/Booking';

describe('User', () => {

  let user, tapeChart;
  beforeEach(() => {
    tapeChart = new TapeChart(userData, roomData, bookingData)
    user = new User(tapeChart.findUser("name", "Dell Rath")[0], tapeChart)
  });

  it('should take a single user info as arg', () => {
    expect(user.name).to.equal("Dell Rath");
    expect(user.id).to.equal(7);
  })

  it('should be able to see its own bookings', () => {
    user.getMyBookings(tapeChart);

    expect(user.myBookings).to.eql([
      { id: 1572293130160,
      userID: 7,
      date: "2019/11/01",
      roomNumber: 12,
      roomServiceCharges: [ ]
      }
    ]);
  })

  it('should be able to get its own total spending', () => {
    user.getMyBookings(tapeChart);
    user.getMySpending(tapeChart);
    expect(user.mySpending).to.equal(172.09);
    let user2 = new User(tapeChart.findUser
      ("name", "Faustino Quitzon")[0], tapeChart);
    user2.getMyBookings(tapeChart);
    user2.getMySpending(tapeChart);
    expect(user2.mySpending).to.equal(340.17);
  })

  it('should be able to make a new booking for themself', () => {
    expect(user.makeBooking('2019/10/29', 5)).to.eql(
      { id: Date.now(),
      userID: 7,
      date: "2019/10/29",
      roomNumber: 5,
      roomServiceCharges: [ ]
      })
  })

})
