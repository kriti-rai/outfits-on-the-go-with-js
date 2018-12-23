$(document).on('turbolinks:load', function() {
  attachListenersForUsers();
});

function attachListenersForUsers() {
  //shows individual profile
  $('.user-show').on('click', function(e) {
    showUser(this);
    e.preventDefault();
  });

  //upon login shows to user's profile
  $('.login-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      method: 'POST',
      data:  {
        'authenticity_token': $("input[name='authenticity_token']").val(),
        'username': $("input[name='username']").val(),
        'password': $("input[name='password']").val()
      }
    }).done(function (user) {
      e.preventDefault()
      $('.col-lg-12').empty();
      $.get(`/users/${user.id}`, function(user) {
        showLoggedUserHTML(user);
      });
    });
  });

   //Next User button
   $('body').on('click', '#nextUser', function (e) {
     e.preventDefault();
     $.get(this.value, function(user) {
         $('.users').empty()
         userHTML(user)
     });
  });
};

var userHTML = (user) => {
  var noImagePath = "./images/no_image.png"
  if (user.image != null) {
    $('.users').prepend($('<img>', {class:'user-show', src:`${user.image.url}`}))
  } else {
    $('.users').prepend($('<img>', {class:'user-show', src:'../../no_image.png'})) //image path does not work

  }
  $('.users').append($(`<br><h1>${user.username}!</h1>`))

  user.image != null ? $('.users').append(`<h6><em><font color= 'grey'>Bio: ${user.bio}</em></h6>`) : false

  if (user.boards.length) {
    $('.users').append(`<p><button value="/users/${user.id}/boards" class="button" id="boards">Boards</button></p>`)
  };

  $('.users').append(`<p><button value="/users/${user.id}/next" id="nextUser" class="button">Next User</button></p>`)

}
var showLoggedUserHTML = (user) => {
  var noImagePath = "./images/no_image.png"
  if (user.image != null) {
    $('.col-lg-12').prepend($('<img>', {class:'user-show', src:`${user.image.url}`}))
  } else {
    $('.col-lg-12').prepend($('<img>', {class:'user-show', src:'../../no_image.png'})) //image path does not work

  }
  $('.col-lg-12').append($(`<br><h1>${user.username}!</h1>`))
  user.image != null ? $('.col-lg-12').append(`<h6><em><font color= 'grey'>Bio: ${user.bio}</em></h6>`) : false
  if (user.boards.length) {
    $('.col-lg-12').append(`<p><button value="/users/${user.id}/boards" class="button">Boards</button><p>`)
  }

  $('.col-lg-12').append(`<p><button value="/users/${user.id}/next" id="nextUser" class="button">Next User</button></p>`)
}

var showUser = (user) => {
  $('.users').empty();
  $.get(`${user.href}`, function(user) {
    userHTML(user);
  })
}
