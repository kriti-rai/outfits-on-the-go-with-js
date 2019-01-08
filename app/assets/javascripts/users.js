$(document).on('turbolinks:load', function() {
  getCurrentUID();
  attachListenersForUsers();
});

var currentUID = 0

function attachListenersForUsers() {
  //show users
  $('#users').on('click', function(e) {
    e.preventDefault();
    listUsers(this);
  });

  //shows current user's page
  $('#current-user').on('click', function(e) {
    e.preventDefault();
    $.get(`${this.href}`, function(user) {
      showCurrentUser(user);
    });
  });

  //Next User button
  $('body').on('click', '#nextUser', function (e) {
    e.preventDefault();
    showNextUser(this);
  });

  //show feed
  $('#feed').on('click', function(e) {
    e.preventDefault();
    showFeed(this.href);
  });

  //render edit form
  $('#edit-account').on('click', function(e) {
    e.preventDefault();
    renderForm(this.href)
  });

  // edit Account
  $('body').on('submit', '.edit_user', function (e) {
    e.preventDefault();
    updateUser(this)
  });

  //delete account
  $('#delete-account').on('click', function(e) {
    e.preventDefault();
    let dialogue = confirm("Are you sure you want to delete your account?")
    if (dialogue) {
      deleteAction(this);
    };
    return false;
  });

  //sign out
  $('#signout').on('click', function(e) {
    e.preventDefault();
    deleteAction(this);
  });

  $('body').on('click', '.feed-user', function (e) {
    e.preventDefault();
  })

  $('body').on('click', '.feed-board', function (e) {
    e.preventDefault();
  })

  $('body').on('click', '.cancel-edit-account', function (e) {
    e.preventDefault();
    showUser(this.href);
  })
};

////////////////////////////HANDLERS//////////////////////////

var updateUser = (form) => {
  let fd = new FormData($('form')[0])
  $.ajax({
    url: form.action,
    type: ($("input[name='_method']").val() || form.method),
    data: fd,
    cache: false,
    contentType: false,
    processData: false,
    success: function(resp) {
      showCurrentUser(resp);
      $('.col-lg-12').prepend('<div class="alert-success">Update Successful<br><br>')

    }
    });
};

var deleteAction = (data) => {
  $.ajax({
    url: data.href,
    type: "DELETE",
    success: function(response) {
      window.location.replace("/");
    }
  });
};

var getCurrentUID = () => {
  $.get("/users/cuid", function(id) {
    currentUID = parseInt(id)
  })
};

var listUsers = (data) => {
  $.get(`${data.href}`, function(users) {
    clear();
    users.forEach(function(user) {
      if (user.image.url === null) {
        $('.col-lg-12').append(`<input type='image' class='user-thumbnail', src="/assets/no_image.png", onclick='showUser("users/${user.id}")'></input>`)
      } else {
        var img = new Image();
        $('.col-lg-12').append(`<input type='image' class='user-thumbnail', src='${user.image.url}', onclick='showUser("users/${user.id}")'></input>`)
      }
      $('.col-lg-12').append($(`<div class="figcaption">${user.username}</div>`))
    });
  });
};

var showCurrentUser = (user) => {
    clear();
    userHTML(user);
};

var showNextUser = (user) => {
  clear();
  $.get(user.dataset.url, function(user) {
    userHTML(user)
    $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/next" id="nextUser" class="btn btn-outline-secondary">Next User</button><p>`)
  });
};

var userHTML = (user) => {
  $('.col-lg-12').append($(`<br><p class="page-user">${user.username}</p>`))

  if (user.image.url != null) {
    $('.col-lg-12').append($('<img>', {class:'user-show', src:`${user.image.url}`}))
  } else {
    $('.col-lg-12').append($('<img>', {class:'user-show', src:"/assets/no_image.png"}))
  }
  user.bio != null ? $('.col-lg-12').append(`<br><br><div class="bio">Bio: ${user.bio}</div>`) : $('.col-lg-12').append(`<br><br>`)
  let url = "/users/${user.id}/boards"
  $('.col-lg-12').append(`<br><button data-url="/users/${user.id}/boards" data-username="${user.username}" class="btn btn-outline-secondary" id="boards" onclick="listBoards(${user.id},this.dataset.url)">View ${user.username}'s Boards</button><br><br>`)
}


var showUser = (url) => {
  $.get(url, function(user) {
    clear();
    userHTML(user);
    $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/next" id="nextUser" class="btn btn-outline-secondary">Next User</button></p>`)
  });
};

var showFeed = (url) => {
  clear();
  $('.col-lg-12').append('<br><br><h1 class-"display-1">Feed</h1><hr>');
  $.getJSON(url, function(boards) {
    boards.forEach((b) => {
      let board = new Board(b)
      $('.col-lg-12').append(`<p><a href="#" class="feed-user" onclick='showUser("/users/${board.user_id}")'>${board.user.username}</a> created <a href="#" class="feed-board" onclick='viewBoard("/boards/${board.id}")'>${board.name}</a> on ${board.created_at}</p>`)
    })
  })
};
