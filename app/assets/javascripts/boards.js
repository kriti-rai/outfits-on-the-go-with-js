
$(document).on('turbolinks:load', function() {
  attachListenersForBoards();
});

function attachListenersForBoards() {
  //list boards
  $('body').on('click', '#boards', function (e) {
    e.preventDefault();
    listBoards(this);
   });

   //list outfits
   $('body').on('click', 'a.board', function (e) {
     e.preventDefault();
     listOutfits(this);
    });

    //list outfits under that hashtag
    $('body').on('click', 'a.tags', function (e) {
      e.preventDefault();
      listTaggedOutfits(this);
     });
};

var listBoards = (data) => {
  $.get(data.dataset.url, function(boards) {
    $('.col-lg-12').empty();
    $('.col-lg-12').append('<h1>Boards</h1>')
    boards.forEach(function(board) {
      $('.col-lg-12').append(`<h5><a href="/boards/${board.id}" class="board">${board.name}</a></h5>`)
    });
  });
};

var listOutfits = (data) => {
  var url = data.href + "/outfits"
  $('.col-lg-12').empty();
  $.get(url, function(outfits) {
    if (outfits.length) {
      $('.col-lg-12').append('<h1>Outfits</h1>')
      outfits.forEach(function(outfit) {
        createOutfitThumbnail(outfit);
      });
    } else {
      $('.col-lg-12').append('<h1>This board has no outfits</h1>')
    };
  });
};

var createOutfitThumbnail = (outfit) => {
  $('.col-lg-12').append(`<input type='image' class='outfit-thumbnail', src='${outfit.image.url}', data-id='${outfit.id}', onclick='showOutfit(this)'></input>`)
  if (outfit.caption != null) {
    $('.col-lg-12').append(`<p><font color="grey"><em>${outfit.caption}</em></font></p>`)
  };
};

var showOutfit = (outfit) => {
  $('.col-lg-12').empty();
  var url = `/outfits/${outfit.dataset.id}`
  $.get(url, function (outfit) {
    $('.col-lg-12').append($('<img>', {class:'outfit-show', src:`${outfit.image.url}`}))
    if (outfit.hashtags) {
      var tagsLabel = "<p>Tags: "
      var tags = []
      outfit.tags.forEach(function(tag) {
        tags.push(`#<a href='#' class="tags" data-id= "${tag.id}" data-name="${tag.name}">${tag.name}</a>`)
      });
      var tagsHTML = tags.join(' ')
      var innerHTML = tagsLabel + tagsHTML + "</p>"
      $('.col-lg-12').append(innerHTML)
    };
  });
};

var listTaggedOutfits = (tag) => {
  $('.col-lg-12').empty();
  $.get(`/hashtags/${tag.dataset.name}`, function (outfits) {
    if (outfits.length) {
      $('.col-lg-12').append(`<h1>#${tag.dataset.name}</h1>`)
      outfits.forEach(function(outfit) {
        createOutfitThumbnail(outfit);
      });
    };
  });
};
