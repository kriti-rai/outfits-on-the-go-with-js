$(document).on('turbolinks:load', function() {
  attachListenersForOutfits();
});

class Outfit {
  constructor(outfit) {
    this.id = outfit.id
    outfit.caption? (this.caption = outfit.caption) : false
    this.hashtags = outfit.hashtags
    this.image = outfit.image
    this.board = outfit.board
    this.board_id = outfit.board.id
    this.user = outfit.user
    this.user_id = outfit.user.id
  }

  outfitHTML () {
    let thumbnailHTML = `<p><input type='image' class='outfit-thumbnail', src='${this.image.url}', data-id='${this.id}'></input></p>`
    return (this.caption != null) ? thumbnailHTML + `<p><class="caption">${this.caption}</p>` : thumbnailHTML
  };
}

//////////////////////LISTENERS/////////////////////////

function attachListenersForOutfits () {
   //list outfits under that hashtag
   $('body').on('click', 'a.tags', function (e) {
     e.preventDefault();
     listTaggedOutfits(this);
    });

    //show outfit page
   $('body').on('click', '.outfit-thumbnail', function (e) {
     e.preventDefault();
     var url = `/outfits/${this.dataset.id}`
     $.get(url, function (outfit) {
       showOutfit(outfit);
     });
   });

    //render create form
   $('body').on('click', '#create-outfit', function (e) {
     e.preventDefault();
     renderForm(this);
   });

   // create outfit
   $('body').on('submit', '#new_outfit', function (e) {
     e.preventDefault();
     createUpdateOutfit(this);
   });


   // render edit form
    $('body').on('click', '#edit-outfit', function (e) {
      e.preventDefault();
      renderForm(this.dataset.url);
    });

   // update outfit
    $('body').on('submit', '.edit_outfit', function (e) {
      e.preventDefault();
      createUpdateOutfit(this);
     });

   //  delete outfit
    $('body').on('click', '#del-outfit', function (e) {
      e.preventDefault();
      deleteOutfit(this)
     });
}

/////////////////////////HANDLERS////////////////////////////

var listOutfits = (outfits) => {
  $('.col-lg-12').append('<br><br>')
  if (outfits.length) {
    outfits.forEach(function(outfit) {
      var newOutfit = new Outfit(outfit)
      $('.col-lg-12').append(newOutfit.outfitHTML());
    });
  } else {
    $('.col-lg-12').append('<br><div class="empty-msg">This board currently has no outfits</div>')
  };
};

var showOutfit = (outfit) => {
  clear();
    if (outfit.caption) {
      $('.col-lg-12').append(`<h5 class="caption">${outfit.caption}</h5><br>`)
    }
    $('.col-lg-12').append($('<img>', {class:'outfit-show', src:`${outfit.image.url}`}))
    if (outfit.hashtags != null) {
      let tags = []
      outfit.tags.forEach(function(tag) {
        tags.push(`#<a href='#' style= "color: grey" class="tags" data-id= "${tag.id}" data-name="${tag.name}">${tag.name}</a>`)
      });
      let tagsHTML = tags.join(' ')
      let innerHTML = '<br><br><p class="hashtags">Tags: ' + tagsHTML + '</p>'
      $('.col-lg-12').append(innerHTML)
    };
    $('.col-lg-12').append(`<br><button type="button" data-url="/boards/${outfit.board.id}" class="btn btn-outline-secondary" onclick="viewBoard(this.dataset.url)">Back</button> `)
    if (currentUID === outfit.user.id) {
      $('.col-lg-12').append(`<button type="button" data-url="/outfits/${outfit.id}/edit" id="edit-outfit" class="btn btn-outline-secondary">Edit</button> <button type="button" data-url="/outfits/${outfit.id}" id="del-outfit" class="btn btn-outline-danger">Delete</button>`)
    };
};

var listTaggedOutfits = (tag) => {
  clear();
  $('.col-lg-12').append(`<h1>#${tag.dataset.name}</h1>`)
  $.get(`/hashtags/${tag.dataset.name}`, function (outfits) {
    if (outfits.length) {
      outfits.forEach(function(o) {
        let outfit = new Outfit(o)
        $('.col-lg-12').append(outfit.outfitHTML());
      });
    };
  });
};

var createUpdateOutfit = (form) => {
  let fd = new FormData($('form')[0])
  $.ajax({
    url: form.action,
    type: ($("input[name='_method']").val() || form.method),
    data: fd,
    cache: false,
    contentType: false,
    processData: false,
    success: function(resp) {
      clear();
      showOutfit(resp);
    }
    });
};

var deleteOutfit = (outfit) => {
  $.ajax({
    url: outfit.dataset.url,
    type: "DELETE",
    data: $(outfit).serialize(),
    success: function(response) {
      clear();
      let url = `/boards/${response.id}`
      viewBoard(url);
    }
  });
};
