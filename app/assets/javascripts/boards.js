
$(document).on('turbolinks:load', function() {
  attachListenersForBoards();
});

class Board {
  constructor(board) {
    this.id = board.id;
    this.name = board.name;
    this.created_at = board.created_at;
    this.user_id = board.user.id;
    this.user = board.user;
    this.outfits = board.outfits;
  }

  createBoardLinks() {
    return $('.col-lg-12').append(`<h5><a href="/boards/${this.id}" class="board">${this.name}</a></h5>`);
  }
}

function attachListenersForBoards() {
   //list current user's boards
   $('body').on('click', '#my-boards', function (e) {
     e.preventDefault();
     let url = this.href
     listBoards(url);
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

var listBoards = (url) => {
  $.get(url, function(boards) {
    clear();
    $('.col-lg-12').append('<h1>Boards</h1>')
    boards.forEach(function(board) {
      let newBoard = new Board(board);
      newBoard.createBoardLinks();
    });
  });
};

var clear = () => {$('.col-lg-12').empty()};

var formatDate = (date) => {
  const d = new Date(date)
  return d.toDateString();
}
