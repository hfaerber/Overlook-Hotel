// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import User from './User.js';
import TapeChart from './TapeChart.js';
import Booking from './Booking.js';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/concierge.jpg'

// psuedocoding
// VARIABLE DECLARATIONS
let user;
let booking;
let tapeChart;

let today = new Date();
findTodaysDate();

function findTodaysDate() {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}/${mm}/${dd}`;
}


// FETCH
let bookingData = fetch('http://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(error => console.log('bookingData', error));

let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(error => console.log('roomData', error));

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users)
  .catch(error => console.log('userData', error));


Promise.all([bookingData, roomData, userData]).then((promise) => {
  bookingData = promise[0];
  roomData = promise[1];
  userData = promise[2];
}).then(() => {
  // instantiate then fire all the display stuff with 'init' function
  tapeChart = new TapeChart(userData, roomData, bookingData);
  loadPageDisplay();
}).catch(error => console.log('promiseALL', error))

//  POST

// post user.booking()
// function postBooking() {
//   post request here
//   {user.makeBooking();}
// }
// .then(re-fetch updated data)
// the successful response may already include the updated data that i could use
// program - post map to download to see it
// .catch(display error message if fails)


// EVENT LISTENERS
$('#button_guest-login').on('click', function() {
  $('#form_guest-login').toggleClass('hide');
  $('#button_team-member-login').toggleClass('hide');
  $('#error_team-member-login').addClass('hide');
  })

$('#button_team-member-login').on('click', function() {
  $('#form_team-member-login').toggleClass('hide');
  $('#button_guest-login').toggleClass('hide');
  $('#error_team-member-login').addClass('hide');
  })

$('#submit_guest').on('click', function(event) {
  event.preventDefault();
  if ($('#guest-login').val().includes('customer') &&
    $('#guest-password').val() === 'overlook2019') {
  window.location = "./customer.html";
  } else {
  $('#error_team-member-login').removeClass('hide');
  }
})

$('#submit_team-member').on('click', function(event) {
  event.preventDefault();
  if ($('#team-member-login').val() === 'manager'
    && $('#team-member-password').val() === 'overlook2019') {
    window.location = "./manager.html";
  } else {
    $('#error_team-member-login').removeClass('hide');
  }
})


// HANDLERS

function loadPageDisplay() {
  $('#manager-dashboard-occupancy').text(`${tapeChart.getOccupancy(today)}%`);
  $('#manager-dashboard-revenue').text(`$${tapeChart.getDaysRevenue(today)}`);
  $('#manager-dashboard-availability').text(`${tapeChart.getAvailableRoomsByDate(today).length}`);
}

// TEMPORARY CODE HOARDING

// APPENDING AVAILABLE ROOMS TO DOM WITH DATASET ROOM NUMBER
// $('.test-click').on('click', function() {
//   tapeChart.getAvailableRoomsByDate(today).forEach(room => {
//     $('#guest-dashboard-bookings').append(`<div class="div_available-room" data-roomnumber="${room.number}"<p>Room ${room.number}</p><p>${room.numBeds} ${room.bedSize}</p></div>`)
//   })
// })

// USING JQUERY EVENT BUBBLING TO GET ROOM NUMBER FROM SELECTED ROOM AND FIRE MAKEBOOKING FUNCTION
// // on click to select room to book:
// $('.div_dashboard').on('click', '.div_available-room', function(event) {
//   user.makeBooking(selectedDate, event.target.dataset.roomnumber)
//   console.log('test', 'test');
//   console.log(event.target.dataset.roomnumber);
//   // gonna need to save variable to capture the selected date somewhere
// })




// tapeChart.getAvailableRoomsByDate(today).forEach(room => {
//   $('#manager-dashboard-availability').append(`<div class="div_available-room"<p>Room ${room.number}</p><p>${room.numBeds} ${room.bedSize}</p></div>`)
// })
// function validateLogin() {
//   if ($('#guest-login').val().includes('customer') &&
//     $('#guest-password').val() === 'overlook2019') {
//       return 'manager';
//   } else if   if ($('#team-member-login').val() === 'manager'
//       && $('#team-member-password').val() === 'overlook2019') {
//       return 'guest';
//   } else {
//     return 'error'
//   }
// }
