$(document).on('turbolinks:load', function() {
  attachListeners();
})

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
      $('.users').append(`<p class="button" src= /users/${user.id}/boards}>Boards</p></br>`)
    }


    $('.users').append(`<p class="button">Next User</p>`)

  })

}

function attachListeners() {
  $('.user-show').on('click', function(e) {
    showUser(this)
    e.preventDefault();
  });
};
