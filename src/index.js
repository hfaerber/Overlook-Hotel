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

// VARIABLE DECLARATIONS
let user;
let booking;
let tapeChart;
let userLogin;
let selectedDate;

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

function formatSelectedDate(date) {
  let regex = /-/gi;
  return date.replace(regex, '/')
}

// FETCH
let bookingData =
  fetch('http://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(error => console.log('bookingData', error));

let roomData =
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(error => console.log('roomData', error));

let userData =
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users)
  .catch(error => console.log('userData', error));

Promise.all([bookingData, roomData, userData]).then((promise) => {
  bookingData = promise[0];
  roomData = promise[1];
  userData = promise[2];
}).then(() => {
  tapeChart = new TapeChart(userData, roomData, bookingData);
  loadManagerPageDisplay();
  loadGuestPageDisplay();
}).catch(error => console.log('promiseALL', error))

//  POST
function postNewBooking(postBody) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings',
  {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(postBody)
  })
  .then(response => console.log('GREATSUCCESS!', response))
  .catch(error => console.log('postError', error))
}

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
      userLogin = $('#guest-login').val();
      localStorage.setItem('userLogin', userLogin);
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

$('#submit_book-room-button').on('click', function() {
  $('.div_available-rooms').remove();
  selectedDate = formatSelectedDate($('#select-date').val());
  let roomType = $('#select-room-type').val();
  console.log(roomType);
  if (selectedDate !== '' ) {
    displayAvailableRooms(selectedDate, roomType);
  } else {
    $('#submit_book-room-button, .button_new-search, .error_no-rooms')
      .toggleClass('hide');
  }
})

$('.button_new-search').on('click', function() {
  $('#select-date').val('');
  $('#select-room-type').val('any');
  $('#submit_book-room-button, .button_new-search, .error_no-rooms')
    .toggleClass('hide');
})

$('.main_guest-page').on('click', '.div_available-rooms', function(event) {
  event.preventDefault();
  let postBody = user.makeBooking(selectedDate,
    event.target.closest('.div_available-rooms').dataset.roomnumber);
  postNewBooking(postBody);
  $(event.target.closest('.div_available-rooms')).remove();
})

// HANDLERS

function loadManagerPageDisplay() {
  $('#manager-dashboard-occupancy').text(`${tapeChart.getOccupancy(today)}%`);
  $('#manager-dashboard-revenue').text(`$${tapeChart.getDaysRevenue(today)}`);
  $('#manager-dashboard-availability').text
    (`${tapeChart.getAvailableRooms(today).length}`);
}

function loadGuestPageDisplay() {
  userLogin = localStorage.getItem('userLogin');
  let foundUser = tapeChart.findUser("id", isolateUserID(userLogin));
  user = new User(foundUser[0], tapeChart);
  $('.span_user-name').text(`${user.name}`);
  $('.span_user-first-name').text(`${user.name.split(' ')[0]}`);
  $('#guest-dashboard-spending').text(`${user.mySpending} points`);
  user.myBookings.forEach(booking => {
    $('#guest-dashboard-bookings').append(`
      <div class="div_guest-bookings"><h4>Confirmation Number: ${booking.id}</h4>
      <p>${booking.date}</p><p>Room Number: ${booking.roomNumber}</p>
      </div>`)
  })
}

function isolateUserID(userLogin) {
  let splitUserLogin = userLogin.split('r');
  return Number(splitUserLogin[1]);
}

function displayAvailableRooms(date, roomType) {
  let availableRooms = tapeChart.getAvailableRooms(date, roomType);
  if (availableRooms.length === 0) {
    $('#submit_book-room-button, .button_new-search, .error_no-rooms')
      .toggleClass('hide')
  } else {
    availableRooms.forEach(room => {
      $('.main_guest-page').append(
        `<div class="div_available-rooms" data-roomnumber="${room.number}">
        <h4>Room Type: ${room.roomType}</h4>
        <p>Beds: ${room.numBeds} ${room.bedSize} size</p>
        <p>Room Number: ${room.number}</p>
        <p>Cost: $${room.costPerNight}</p>
        </div>`)
    })
  }
}
