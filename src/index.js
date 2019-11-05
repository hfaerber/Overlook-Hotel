// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import User from './User.js';
import TapeChart from './TapeChart.js';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/concierge.jpg'

// VARIABLE DECLARATIONS
let user;
let booking;
let tapeChart;
let userLogin;
let selectedDate;
let selectedUser = null;

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

// LOGIN PAGE EVENT LISTENERS
$('#button_guest-login').on('click', function() {
  $('#form_guest-login').toggleClass('hide');
  $('#button_team-member-login').toggleClass('hide');
  $('#error_login-js').addClass('hide');
})

$('#button_team-member-login').on('click', function() {
  $('#form_team-member-login').toggleClass('hide');
  $('#button_guest-login').toggleClass('hide');
  $('#error_login-js').addClass('hide');
})

$('#submit_guest').on('click', function(event) {
  event.preventDefault();
  if ($('#guest-login').val().includes('customer') &&
    $('#guest-password').val() === 'overlook2019') {
      userLogin = $('#guest-login').val();
      localStorage.setItem('userLogin', userLogin);
      window.location = "./customer.html";
  } else {
    $('#error_login-js').removeClass('hide');
  }
})

$('#submit_team-member').on('click', function(event) {
  event.preventDefault();
  if ($('#team-member-login').val() === 'manager'
    && $('#team-member-password').val() === 'overlook2019') {
    window.location = "./manager.html";
  } else {
    $('#error_login-js').removeClass('hide');
  }
})

// PORTAL PAGES EVENT LISTENERS

$('#button_find-room-js').on('click', function(event) {
  $('.div_available-rooms').remove();
  $('.error_no-rooms').addClass('hide');
  selectedDate = formatSelectedDate($('#select-date').val());
  let roomType = $('#select-room-type').val();
  if (selectedDate !== ''
    && window.location.pathname === '/customer.html') {
      displayAvailableRooms(selectedDate, roomType, '.main_guest');
  } else if (selectedDate !== ''
    && window.location.pathname === '/manager.html') {
      displayAvailableRooms(selectedDate, roomType, '.div_right-main')
  } else {
    $('.error_no-rooms').removeClass('hide');
  }
})

// if (window.location.pathname === './customer.html')

$('.button_clear-search').on('click', function() {
  $('.div_available-rooms').remove();
  $('#select-date').val('');
  $('#select-room-type').val('any');
  $('.error_no-rooms').addClass('hide');
})

// CREATE AND POST NEW BOOKING FOR USER
$('.main_portal-page').on('click', '.button_book-now', function(event) {
  let postBody;
  let roomNum = $(this).data('roomnumber');
  if (window.location.pathname === '/customer.html') {
    postBody = user.makeBooking(selectedDate, roomNum);
    postNewBooking(postBody);
    $(this).closest('.div_available-rooms').remove();
  } else if (selectedUser !== null && window.location.pathname === '/manager.html') {
    postBody = selectedUser.makeBooking(selectedDate, roomNum);
    postNewBooking(postBody);
    $(this).closest('.div_available-rooms').remove();
  } else {
    $('.error_select-guest').removeClass('hide');
  }
})

// SEARCH USERS BY NAME
$('#input_search-guest').on('keyup', function() {
  selectedUser = null;
  $('.ul_guest-search-matches').html('')
  $('.error_select-guest').addClass('hide');
  let searchSoFar = $('#input_search-guest').val().toLowerCase();
  $('.ul_guest-search-matches').html('');
  let foundUsers = tapeChart.findUserFromSearch('name', searchSoFar);
  if (foundUsers.length > 0 && searchSoFar.length > 0) {
    foundUsers.forEach(user => {
      $('.ul_guest-search-matches').append(
        `<button class="button_searched-user-name" data-guestname="${user.name}">
        ${user.name}</button>`)
    })
  }
})

// SELECT GUEST FROM SEARCH, INSTANTIATE GUEST AND LOAD THEIR STUFF
$('.ul_guest-search-matches').on('click', '.button_searched-user-name', function() {
  $('.error_select-guest').addClass('hide');
  let userName = $(this).data('guestname');
  $('.ul_guest-search-matches').html($(this));
  let userInfo = tapeChart.findUser('name', userName)

  selectedUser = new User(userInfo[0], tapeChart);

  $('.span_selected-guest').text(`${selectedUser.name.split(' ')[0]}`)
  $('.ul_guest-search-matches').append(`
    <li class="selected-guest-spend">
      ${selectedUser.name.split(' ')[0]}\'s Loyalty Points:
      ${selectedUser.mySpending}</li></br><li class="selected-guest-bookings">
        ${selectedUser.name.split(' ')[0]}\'s Bookings:</li>`)
  selectedUser.myBookings.forEach(booking => {
    $('.ul_guest-search-matches').append(`
      <div class="div_selected-user-bookings"><h4>${booking.date}</h4>
      <p>Confirmation: ${booking.id}</p>
      <p>Room Number: ${booking.roomNumber}</p>
      </div>
      `)
  })
  // add booking for that user **which class?**
  // delete booking for that user **tapeChart**

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
      <div class="div_guest-bookings"><h4>CONFIRMATION NUMBER: ${booking.id}</h4>
      <p>${booking.date}</p><p>ROOM NUMBER: ${booking.roomNumber}</p>
      </div>`)
  })
}

function isolateUserID(userLogin) {
  let splitUserLogin = userLogin.split('r');
  return Number(splitUserLogin[1]);
}

function displayAvailableRooms(date, roomType, where) {
  let availableRooms = tapeChart.getAvailableRooms(date, roomType);
  if (availableRooms.length === 0) {
    $('.error_no-rooms')
      .removeClass('hide')
  } else {
    availableRooms.forEach(room => {
      $(where).append(
        `<div class="div_available-rooms">
        <h4>ROOM TYPE: ${room.roomType}</h4>
        <p>BEDS: ${room.numBeds} ${room.bedSize} size</p>
        <p>ROOM NUMBER: ${room.number}</p>
        <p>COST: $${room.costPerNight}</p>
        <button class="button_book-now" data-roomnumber="${room.number}">BOOK NOW</button>
        </div>`)
    })
  }
}
