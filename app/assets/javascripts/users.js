$(document).on('turbolinks:load', function() {
  attachListenersForUsers();
});

function attachListenersForUsers() {
  //show users
  $('#users').on('click', function(e) {
    e.preventDefault();
    listUsers(this);
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

  //show feed
  $('#feed').on('click', function(e) {
    e.preventDefault();
    showFeed(this);
  });


  //render edit account
  $('#edit-account').on('click', function(e) {
    e.preventDefault();
    $.get(this.href, function(editForm) {
      $('.col-lg-12').empty();
      $('.col-lg-12').append(editForm)
    })
  });

  // edit Account
  $('body').on('submit', '.edit_user', function (e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: "PATCH",
      data: $(this).serialize(),
      success: function(response) {
        $('.col-lg-12').empty();
        userHTML(response);
      }
    });
  });

  //delete account
  $('#delete-account').on('click', function(e) {
    e.preventDefault();
    deleteAccount(this);
  });

};

//delete account
var deleteAccount = (data) => {
  let dialogue = confirm("Are you sure you want to delete your account?")
  if (dialogue) {
    $.ajax({
      url: data.href,
      type: "DELETE",
      success: function(response) {
        window.location.replace("/");
      }
    });
  };
  return false
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

var showFeed = (data) => {
  $.getJSON(`${data.href}`, function(resp) {
    $('.col-lg-12').empty()
    $('.col-lg-12').append('<h1>Feed</h1><br>')
    resp.forEach(function(board) {
      $('.col-lg-12').append(`<p><a href="#" data-url="/users/${board.user.id}">${board.user.username}</a> created <a href="#" data-url="/boards/${board.id}">${board.name}</a> on ${board.created_at}</p>`)
    })
  });
};
