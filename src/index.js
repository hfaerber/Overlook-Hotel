// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/concierge.jpg'

console.log('This is the JavaScript entry file - your code begins here.');

// psuedocoding
// event listener on customer login button that expands customer login form
// event listener on team member login button that expands team member login form

// event listener on customer submit button that checks if password === correct
// and if username is valid with id
// IF NOT  error message try again
// IF CORRECT display customer page
// ^^same for manager but with manager stuff

// EVENT LISTENERS


// HANDLERS

// do i need to worry about upper vs lowercase?
function validateLogin() {
  if ( $('#team-member-login').val() === 'manager' &&
    $('#team-member-password').val() === 'overlook2019') {
      return 'manager';
  } else if ($('#customer-login').val().includes('customer') &&
    $('#customer-password').val() === 'overlook2019') {
      return 'customer';
  } else {
    return 'error'
  }
}
