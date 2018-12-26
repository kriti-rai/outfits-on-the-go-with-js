$(document).on('turbolinks:load', function() {
  attachListenersForUsers();
});

function attachListenersForUsers() {
  //show users
  $('#users').on('click', function(e) {
    e.preventDefault();
    listUsers(users);
  });

  //shows current user's page
  $('#current-user').on('click', function(e) {
    e.preventDefault();
    showCurrentUser(this);
  });

  //Next User button
  $('body').on('click', '#nextUser', function (e) {
    e.preventDefault();
    showNextUser(this);
  });


  //upon login shows to user's profile
  // $('.login-form').on('submit', function(e) {
  //   debugger
  //   e.preventDefault();
  //   $.ajax({
  //     url: this.action,
  //     method: 'POST',
  //     data:  {
  //       'authenticity_token': $("input[name='authenticity_token']").val(),
  //       'username': $("input[name='username']").val(),
  //       'password': $("input[name='password']").val()
  //     }
  //   }).done(function (user) {
  //     e.preventDefault()
  //     $('.col-lg-12').empty();
  //     $('.col-lg-12').prepend("<br><br><br><br><br>")
  //     $.get(`/users/${user.id}`, function(user) {
  //       showLoggedUserHTML(user);
  //     });
  //   });
  // });

};

var listUsers = (data) => {
  $.get(`${data.href}`, function(users) {
    $('.col-lg-12').empty()
    users.forEach(function(user) {
      if (user.image.url === null) {
        $('.col-lg-12').append(`<input type='image' class='user-thumbnail', src="/assets/no_image.png", data-id='${user.id}', onclick='showUser(this)'></input>`)
      } else {
        var img = new Image();
        $('.col-lg-12').append(`<input type='image' class='user-thumbnail', src='${user.image.url}', data-id='${user.id}', onclick='showUser(this)'></input>`)
      }
      $('.col-lg-12').append($(`<div class="figcaption">${user.username}</div>`))
    });
  });
};

var showCurrentUser = (user) => {
  $.getJSON(`${user.href}`, function(user) {
    $('.col-lg-12').empty();
    userHTML(user);
  });
};

var showNextUser = (user) => {
  $('.col-lg-12').empty()
  $.get(user.dataset.url, function(user) {
    userHTML(user)
  });
};

var userHTML = (user) => {
  if (user.image.url != null) {
    $('.col-lg-12').append($('<img>', {class:'user-show', src:`${user.image.url}`}))
  } else {
    $('.col-lg-12').append($('<img>', {class:'user-show', src:"/assets/no_image.png"}))
  }
  $('.col-lg-12').append($(`<br><h1>${user.username}!</h1>`))

  user.image != null ? $('.col-lg-12').append(`<h6><em><font color= 'grey'>Bio: ${user.bio}</em></h6>`) : false

  if (user.boards.length) {
    $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/boards" class="button" id="boards">Boards</button></p>`)
  };

  $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/next" id="nextUser" class="button">Next User</button></p>`)

}

var showUser = (user) => {
  var url= `/users/${user.dataset.id}`
  $.getJSON(url, function(user) {
    $('.col-lg-12').empty();
    userHTML(user);
  });
};

// var feed = () => {
//
// }
// var showLoggedUserHTML = (user) => {
//   var noImagePath = "./images/no_image.png"
//   if (user.image != null) {
//     $('.col-lg-12').append($('<img>', {class:'user-show', src:`${user.image.url}`}))
//   } else {
//     $('.col-lg-12').append($('<img>', {class:'user-show', src:'../../no_image.png'})) //image path does not work
//
//   }
//   $('.col-lg-12').append($(`<br><h1>${user.username}!</h1>`))
//   user.image != null ? $('.col-lg-12').append(`<h6><em><font color= 'grey'>Bio: ${user.bio}</em></h6>`) : false
//   if (user.boards.length) {
//     $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/boards" class="button">Boards</button><p>`)
//   }
//
//   $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/next" id="nextUser" class="button">Next User</button></p>`)
// }
