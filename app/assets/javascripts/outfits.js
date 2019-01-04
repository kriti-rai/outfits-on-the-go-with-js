$(document).on('turbolinks:load', function() {
  attachListenersForOutfits();
});

class Outfit {
  constructor(outfit) {
    this.id = outfit.id
    outfit.caption? (this.caption = outfit.caption) : false
    this.tags = outfit.tags //outfit.hashtags?
    this.image = outfit.image
    this.board = outfit.board
    this.board_id = outfit.board.id
    this.user = outfit.user
    this.user_id = outfit.board.user.id
  }

  outfitHTML () {
    let thumbnailHTML = `<input type='image' class='outfit-thumbnail', src='${this.image.url}', data-id='${this.id}', onclick='showOutfit(this)'></input>`
    let captionHTML
    (this.caption != null) ? captionHTML = `<p><font color="grey"><em>${this.caption}</em></font></p>` : false
    return imgThumbnailHTML + captionHTML
  };
}

//////////////////////LISTENERS/////////////////////////

function attachListenersForOutfits () {
   //list outfits under that hashtag
   $('body').on('click', 'a.tags', function (e) {
     e.preventDefault();
     listTaggedOutfits(this);
    });

}

/////////////////////////HANDLERS////////////////////////////

var listOutfits = (outfits) => {
  clear();
  if (outfits.length) {
    $('.col-lg-12').append('<h1>Outfits</h1>')
    outfits.forEach(function(outfit) {
      var newOutfit = new Outfit(outfit)
      $('.col-lg-12').append(newOutfit.createOutfitThumbnail());
    });
  } else {
    $('.col-lg-12').append('<h1>This board has no outfits</h1>')
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
