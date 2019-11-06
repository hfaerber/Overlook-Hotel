const chai = require('chai');
const expect = chai.expect;

import userData from '../sampleData/sample-user-data';
import roomData from '../sampleData/sample-room-data';
import bookingData from '../sampleData/sample-booking-data.js';

import TapeChart from '../src/TapeChart';

describe('TapeChart', () => {

  let tapeChart;
  beforeEach(() => {
    tapeChart = new TapeChart(userData, roomData, bookingData)
  });

  it('should be a function', () => {
    expect(TapeChart).to.be.a('function');
  });

  it('should be an instance of the class TapeChart', () => {
    expect(tapeChart).to.be.an.instanceOf(TapeChart);
  });

  it('should be able to filter rooms by room type', () => {
    expect(tapeChart.filterByRoomType(tapeChart.rooms, 'suite')).to.eql([
      {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
      },
      {
      number: 10,
      roomType: "suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 497.64
      }
    ])
  })

    describe('getAvailableRooms', () => {
      it('should get available rooms by date', () => {
        expect(tapeChart.getAvailableRooms('2019/06/15')).to.eql([
          {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4
          },
          {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38
          },
          {
          number: 3,
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 491.14
          },
          {
          number: 4,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 429.44
          },
          {
          number: 5,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 340.17
          },
          {
          number: 6,
          roomType: "junior suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 397.02
          },
          {
          number: 7,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 231.46
          },
          {
          number: 8,
          roomType: "junior suite",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 261.26
          },
          {
          number: 9,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 200.39
          },
          {
          number: 10,
          roomType: "suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 1,
          costPerNight: 497.64
          },
          {
          number: 11,
          roomType: "single room",
          bidet: true,
          bedSize: "twin",
          numBeds: 2,
          costPerNight: 207.24
          },
          {
          number: 12,
          roomType: "single room",
          bidet: false,
          bedSize: "twin",
          numBeds: 2,
          costPerNight: 172.09
          },
          {
          number: 13,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 423.92
          },
          {
          number: 14,
          roomType: "residential suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 1,
          costPerNight: 457.88
          },
          {
          number: 15,
          roomType: "residential suite",
          bidet: false,
          bedSize: "full",
          numBeds: 1,
          costPerNight: 294.56
          },
          {
          number: 16,
          roomType: "single room",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 325.6
          },
          {
          number: 17,
          roomType: "junior suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 2,
          costPerNight: 328.15
          },
          {
          number: 18,
          roomType: "junior suite",
          bidet: false,
          bedSize: "king",
          numBeds: 2,
          costPerNight: 496.41
          },
          {
          number: 19,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 374.67
          },
          {
          number: 20,
          roomType: "residential suite",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 343.95
          }
        ]);
        expect(tapeChart.getAvailableRooms('2019/11/22').length).to.equal(17);
      })

      it('should filter rooms available by date by selected room type', () => {
        expect(tapeChart.getAvailableRooms('2019/06/15', "suite")).eql([
          {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38
          },
          {
          number: 10,
          roomType: "suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 1,
          costPerNight: 497.64
          }
        ])
      })
    })

  it('should calculate the occupany percentage for a given date', () => {
    expect(tapeChart.getOccupancy('2019/06/15')).to.equal(0);
    expect(tapeChart.getOccupancy('2019/11/22')).to.equal(15);
    expect(tapeChart.getOccupancy('2019/12/15')).to.equal(5);
  })

  it('should get all bookings for a given date', () => {
    expect(tapeChart.filterBookingsByMetric('date', '2019/06/15')).to.eql([]);
    expect(tapeChart.filterBookingsByMetric('date', '2019/11/22')).to.eql([
      {
      id: 1572293130160,
      userID: 8,
      date: "2019/11/22",
      roomNumber: 1,
      roomServiceCharges: [ ]
      },
      {
      id: 1572293130160,
      userID: 3,
      date: "2019/11/22",
      roomNumber: 9,
      roomServiceCharges: [ ]
      },
      {
      id: 1572293130160,
      userID: 11,
      date: "2019/11/22",
      roomNumber: 8,
      roomServiceCharges: [ ]
      }
    ]);
    expect(tapeChart.filterBookingsByMetric('date', '2019/12/15')).to.eql([
      {
      id: 1572293130160,
      userID: 26,
      date: "2019/12/15",
      roomNumber: 2,
      roomServiceCharges: [ ]
      }
    ]);
  })

  it('should calculate total revenue for a given date', () => {
    expect(tapeChart.getDaysRevenue('date', '2019/06/15')).to.equal(0.00);
    expect(tapeChart.getDaysRevenue('date', '2019/11/22')).to.equal(820.05);
    expect(tapeChart.getDaysRevenue('date', '2019/12/15')).to.equal(477.38);
  })

  it('should filter available rooms for a given date by feature', () => {
    expect(tapeChart.filterAvailableRoomsByFeature
      ('2019/06/15', 'bedSize', 'queen')).to.eql([
        {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
        },
        {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
        },
        {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
        },
        {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
        },
        {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
        },
        {
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39
        },
        {
        number: 13,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 423.92
        },
        {
        number: 19,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 374.67
        },
        {
        number: 20,
        roomType: "residential suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 343.95
        }
    ]);
    expect(tapeChart.filterAvailableRoomsByFeature
      ('2019/11/22', 'bidet', true)).to.eql([
        {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
        },
        {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
        },
        {
        number: 11,
        roomType: "single room",
        bidet: true,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 207.24
        },
      ]);
    expect(tapeChart.filterAvailableRoomsByFeature
      ('2019/11/22', 'bidet', false).length).to.equal(14);
  })

  it('should be able to find user by name', () => {
    expect(tapeChart.findUser("name", "Dell Rath")).to.eql([{
    id: 7,
    name: "Dell Rath"
    }])
  })

  it('should be able to filter bookings by given user', () => {
    expect(tapeChart.filterBookingsByMetric('userID', 7)).to.eql([
      { id: 1572293130160,
      userID: 7,
      date: "2019/11/01",
      roomNumber: 12,
      roomServiceCharges: [ ]
      }
    ])
  })

  it('should be able to delete bookings', () => {
    expect(tapeChart.deleteBooking(1572293130160)).to.eql({ id: 1572293130160 })
  })

})
