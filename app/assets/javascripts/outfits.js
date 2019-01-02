$(document).on('turbolinks:load', function() {
  attachListenersForOutfits();
});

class Outfit {
  constructor(outfit) {
    this.id = outfit.id
    outfit.caption? (this.caption = outfit.caption) : false
    this.tags = outfit.tags
    this.image = outfit.image
    this.board_id = outfit.board.id
    this.user_id = outfit.board.user.id
  }
}

function attachListenersForOutfits () {
  //view board by clicking view
  $('body').on('click', '#view-board', function (e) {
    e.preventDefault();
    let url = this.dataset.url + "/outfits"
    $.get(url, function(outfits) {
       listOutfits(outfits);
     });
   });
   
   //view board by clicking title
  $('body').on('click', 'a.board', function (e) {
    e.preventDefault();
    let url = this.href + "/outfits"
    $.get(url, function(outfits) {
       listOutfits(outfits);
     });
   });

   //list outfits under that hashtag
   $('body').on('click', 'a.tags', function (e) {
     e.preventDefault();
     listTaggedOutfits(this);
    });

}

var listOutfits = (outfits) => {
  clear();
  if (outfits.length) {
    $('.col-lg-12').append('<h1>Outfits</h1>')
    outfits.forEach(function(outfit) {
      createOutfitThumbnail(outfit);
    });
  } else {
    $('.col-lg-12').append('<h1>This board has no outfits</h1>')
  };
};

var createOutfitThumbnail = (outfit) => {
  $('.col-lg-12').append(`<input type='image' class='outfit-thumbnail', src='${outfit.image.url}', data-id='${outfit.id}', onclick='showOutfit(this)'></input>`)
  if (outfit.caption != null) {
    $('.col-lg-12').append(`<p><font color="grey"><em>${outfit.caption}</em></font></p>`)
  };
};

var showOutfit = (outfit) => {
  clear();
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
  clear();
  $.get(`/hashtags/${tag.dataset.name}`, function (outfits) {
    if (outfits.length) {
      $('.col-lg-12').append(`<h1>#${tag.dataset.name}</h1>`)
      outfits.forEach(function(outfit) {
        createOutfitThumbnail(outfit);
      });
    };
  });
};
