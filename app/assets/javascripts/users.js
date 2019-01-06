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

  //signin
  // $('body').on('submit', '#new_user', function (e) {
  //   e.preventDefault();
  //   // initializeBoards();
  //   createUser(this)
  // });
  // //
  // $('body').on('submit', '#signin', function (e) {
  //   // e.preventDefault();
  //   // debugger
  //   // initializeBoards()
  //   createUser(this)
  // });

  //show feed
  $('#feed').on('click', function(e) {
    e.preventDefault();
    showFeed(this);
  });

  //render edit form
  $('#edit-account').on('click', function(e) {
    e.preventDefault();
    $.get(this.href, function(editForm) {
      clear();
      $('.col-lg-12').append(editForm)
    })
  });

  // edit Account
  $('body').on('submit', '.edit_user', function (e) {
    e.preventDefault();
    createUpdateUser(this)
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

};

////////////////////////////HELPER FUNCTIONS///////////////////////////

var createUpdateUser = (form) => {
  var fd = new FormData($('form')[0])
  $.ajax({
    url: form.action,
    type: ($("input[name='_method']").val() || form.method),
    data: fd,
    cache: false,
    contentType: false,
    processData: false,
    success: function(resp) {
      clear();
      showCurrentUser(resp);
    }
    });
};

var createUser = (form) => {
  // var fd = new FormData($('form')[0])
  debugger
  $.ajax({
    url: form.action,
    type: "POST",
    data: $(form).serialize(),
    cache: false,
    contentType: false,
    processData: false,
    success: function(resp) {
      clear();
      getCurrentUID();
      showFeed();
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
    clear();
    userHTML(user);
};

var showNextUser = (user) => {
  clear();
  $.get(user.dataset.url, function(user) {
    userHTML(user)
    $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/next" id="nextUser" class="button">Next User</button></p>`)
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
let url = "/users/${user.id}/boards"
  $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/boards" data-username="${user.username}" class="button" id="boards" onclick="listBoards(${user.id},this.dataset.url)">Boards</button></p>`)
}


var showUser = (user) => {
  var url= `/users/${user.dataset.id}`
  $.get(url, function(user) {
    clear();
    userHTML(user);
    $('.col-lg-12').append(`<p><button data-url="/users/${user.id}/next" id="nextUser" class="button">Next User</button></p>`)
  });
};

var showFeed = () => {
    clear();
    $('.col-lg-12').append('<h1>Feed</h1><br>')
    boardsCollection.forEach(function(board) {
      $('.col-lg-12').append(`<p><a href="#" data-url="/users/${board.user_id}">${board.user.username}</a> created <a href="#" data-url="/boards/${board.id}">${board.name}</a> on ${board.created_at}</p>`)
    })
};
