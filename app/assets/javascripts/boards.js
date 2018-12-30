
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
    let innerHTML = `
      <br>
      <h4>
        <a href="/boards/${this.id}" class="board">${this.name}</a>
        <button type="button" class="btn btn-info btn-sm">View</button>
        <button type="button" class="btn btn-primary btn-sm">Edit</button>
        <button type="button" class="btn btn-danger btn-sm">Delete</button>
      </h4>
      `
    return innerHTML;
  };
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
    $('.col-lg-12').append('<h1>Boards <button type="button" class="btn btn-success">Create Board</button></h1>')
    boards.forEach(function(board) {
      let newBoard = new Board(board);
      $('.col-lg-12').append(newBoard.createBoardLinks());
    });
  });
};

var addBoard = (board) => {

};

var deleteBoard = (board) => {

};

var editBoard = (board) => {

};


var clear = () => {$('.col-lg-12').empty()};

var formatDate = (date) => {
  const d = new Date(date)
  return d.toDateString();
}
