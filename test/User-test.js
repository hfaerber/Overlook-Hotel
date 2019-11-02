const chai = require('chai');
const expect = chai.expect;

import userData from '../sampleData/sample-user-data';
import roomData from '../sampleData/sample-room-data';
import bookingData from '../sampleData/sample-booking-data';

import TapeChart from '../src/TapeChart';
import User from '../src/User';

describe('User', () => {

  let user, tapeChart;
  beforeEach(() => {
    tapeChart = new TapeChart(userData, roomData, bookingData)
    user = new User(tapeChart.findUserByName("Dell Rath")[0],
      tapeChart.filterBookingsByMetric('userID', 7), roomData)
  });

  it('should take a single user info as arg', () => {
    expect(user.id).to.equal(7);
  })

  it('should be able to see its own bookings', () => {
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
    expect(user.getMySpending()).to.equal(172.09)
    user = new User(tapeChart.findUserByName("Faustino Quitzon")[0],
      tapeChart.filterBookingsByMetric('userID', 9), roomData)
    expect(user.getMySpending()).to.equal(340.17)
  })

})
