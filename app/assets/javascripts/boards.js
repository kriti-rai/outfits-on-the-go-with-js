
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
    let innerHTML = "<br><h4>"
    let currentUserBoardsHTML = `
        <a href="/boards/${this.id}" class="board">${this.name}</a>
        <button type="button" data-url="/boards/${this.id}" id="view-board" class="btn btn-info btn-sm">View</button>
        <button type="button" data-url="/boards/${this.id}/edit" id="edit-board" class="btn btn-primary btn-sm">Edit</button>
        <button type="button" data-url="/boards/${this.id}" id="delete-board" class="btn btn-danger btn-sm">Delete</button>
      </h4>
      `
    let userBoardsHTML = `
        <a href="/boards/${this.id}" class="board">${this.name}</a>
        <button type="button" data-url="/boards/${this.id}" id="view-board" class="btn btn-info btn-sm">View</button>
      </h4>
      `
    if (this.id === currentUID) {
      return innerHTML + currentUserBoardsHTML
    } else {
    return innerHTML + userBoardsHTML;
    }
  };
}

function attachListenersForBoards() {
   //list current user's boards
   $('body').on('click', '#my-boards', function (e) {
     e.preventDefault();
     let url = this.href
     listBoards(url);
    });

   //render create form
   $('body').on('click', '#create-board', function (e) {
     debugger
     e.preventDefault();
     $.get(this.href, function(form) {
       clear();
       $('.col-lg-12').append(form)
     })
   });

   //create board
   $('body').on('submit', '#create-board', function (e) {
     e.preventDefault();
     $.ajax({
       url: this.action,
       type: "POST",
       data: $(this).serialize(),
       success: function(response) {
         listBoards(response);
       }
     });
    });
};

var listBoards = (url) => {
  $.get(url, function(boards) {
    clear();
    let user = boards[0].user
    if (user.id === currentUID) {
      $('.col-lg-12').append(`<h1> Your Boards <button type="button" data-url="/users/${currentUID}/boards/new" id="create-board" class="btn btn-success">Create Board</button></h1>`)
    } else {
      $('.col-lg-12').append(`<h1>${user.username}'s Boards</h1>`)
    }
    boards.forEach(function(board) {
      let newBoard = new Board(board);
      $('.col-lg-12').append(newBoard.createBoardLinks());
    });
  });
};

var showBoard = (uid, id) => {

}

// var listBoardsForCurrentUser  = (url) => {
//   $.get(url, function(boards) {
//     clear();
//     $('.col-lg-12').append(`<h1>Boards <button type="button" data-url="#" id="create-board" class="btn btn-success">Create Board</button></h1>`)
//     boards.forEach(function(board) {
//       let newBoard = new Board(board);
//       $('.col-lg-12').append(newBoard.createBoardLinks());
//     });
//   });
// };

var createBoard = (board) => {
  debugger
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
