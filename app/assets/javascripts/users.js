$(document).on('turbolinks:load', function() {
  attachListeners();
});

function attachListeners() {
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

  $('body').on('click', '#boards', function (e) {
    $.get(this.value, function(boards) {
      e.preventDefault();
      $('.users').empty();
      $('.users').append('<h1>Boards</h1>')
      boards.forEach(function(board) {
        $('.users').append(`<h5><a href="/boards/${board.id}">${board.name}</a></h5>`)
      });
    });
   });

   // $('body').on('click', '#nextUser', function () {
   //    alert("Next");
   //  });
};

// var boardsButton = (user) => {
//   $.get(`/users/${user.id}/boards`, function(boards) {
//     debugger
//   });
// };

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

  $('.col-lg-12').append(`<p><button id="nextUser" class="button">Next User</button></p>`)
}

var showUser = (user) => {
  $('.users').empty();
  $.get(`${user.href}`, function(user) {
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
    }


    $('.users').append(`<p><button id="nextUser" class="button">Next User</button></p>`)
  })
}

// var showNextUser = () => {
//   $('#boards.button').on('click', function(e) {
//     // e.preventDefault();
//     alert('hey')
//     // debugger
//   })
// }
