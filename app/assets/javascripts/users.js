$(document).on('turbolinks:load', function() {
  attachListeners();
})


function attachListeners() {
  $('.user-show').on('click', function(e) {
    $.ajax({
      url: this.href,
      dataType: 'script'
    })

    e.preventDefault();
  });
};
