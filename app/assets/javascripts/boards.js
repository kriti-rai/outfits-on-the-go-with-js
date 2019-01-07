
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
        <a href="/boards/${this.id}" id="board-button" class="board">${this.name}</a>
          <button type="button" data-url="/boards/${this.id}" id="view-board" class="btn btn-outline-info">View</button>
          <button type="button" data-url="/boards/${this.id}/edit" id="edit-board" class="btn btn-outline-primary">Edit</button>
          <button type="button" data-url="/boards/${this.id}" id="delete-board" class="btn btn-outline-danger">Delete</button></h4>
      `
    let userBoardsHTML = `
        <a href="/boards/${this.id}" id="board-button" class="board">${this.name}</a>
        <button type="button" data-url="/boards/${this.id}" id="view-board" class="btn btn-outline-info">View</button>
      </h4>
      `
    if (this.user_id === currentUID) {
      return innerHTML + currentUserBoardsHTML
    } else {
    return innerHTML + userBoardsHTML;
    }
  };
}

function attachListenersForBoards() {
  //view board by clicking view
  $('body').on('click', '#view-board', function (e) {
    e.preventDefault();
    let url = this.dataset.url
    viewBoard(url);
   });

   //view board by clicking title
  $('body').on('click', 'a.board', function (e) {
    e.preventDefault();
    let url = this.href
    viewBoard(url);
   });

   //list current user's boards
   $('body').on('click', '#my-boards', function (e) {
     e.preventDefault();
     let url = this.href;
     listBoards(currentUID,url);
    });

   //render create form
   $('body').on('click', '#create-board', function (e) {
     e.preventDefault();
     renderForm(this);
   });

   //create board
   $('body').on('submit', '#new_board', function (e) {
     e.preventDefault();
     createBoard(this)
    });

    //render edit form
    $('body').on('click', '#edit-board', function (e) {
      e.preventDefault();
      renderForm(this.dataset.url)
    });

    //edit board
    $('body').on('submit', '.edit_board', function (e) {
      e.preventDefault();
      editBoard(this);
     });

    //delete board
    $('body').on('click', '#delete-board', function (e) {
      e.preventDefault();
      deleteBoard(this)
     });

     //cancel edit
     $('body').on('click', '.cancel-edit-board', function (e) {
       e.preventDefault();
       viewBoard(this.href);
     })
};

////////////////////////HELPER FUNCTIONS////////////////////////////////

var viewBoard = (url) => {
  clear();
  $.get(url, function(board) {
    $('.col-lg-12').prepend(`<span class="page-header">${board.name}</span><br><br><button type="button" data-url="/users/${board.user.id}/boards" id="back-boards" onclick="listBoards(${board.user.id}, this.dataset.url)" class="btn btn-outline-secondary">Back</button> `);
    let user = board.user;
    if (user.id === currentUID) {
      $('.col-lg-12').append(`<button type="button" data-url="/boards/${board.id}/outfits/new" id="create-outfit" class="btn btn-outline-secondary">Add Outfit</button> `)
    }
   listOutfits(board.outfits);
   });
}

var listBoards = (uid,url) => {
  $.get(url, function(boards) {
    $.getJSON(`/users/${uid}`, function(data) {
      let user = data;
      clear();
      if (boards.length) {
        if (uid === currentUID) {
          $('.col-lg-12').append(`<p class="page-header">My Boards</p><button type="button" data-url="/users/${currentUID}/boards/new" id="create-board" class="btn btn-success btn-sm">Create a board</button><br>`)
        } else {
          $('.col-lg-12').append(`<p class="page-header">${user.username}'s Boards</p>`)
        }
        boards.forEach(function(board) {
          let newBoard = new Board(board);
          $('.col-lg-12').append(newBoard.createBoardLinks());
        });
      } else {
        if (uid === currentUID) {
          $('.col-lg-12').append(`<div class="empty-msg">You currently have no boards.</div> <br><button type="button" data-url="/users/${currentUID}/boards/new" id="create-board" class="btn btn-outline-secondary">Create Board</button>`)
        } else {
          $('.col-lg-12').append(`<div class="empty-msg">This user currently has no boards.</div>`)
        };
      };
    });
  });
};

var renderForm = (url) => {
  $.get(url, function(form) {
    clear();
    $('.col-lg-12').append(form)
  });
};

var createBoard = (board) => {
  $.ajax({
    url: board.action,
    type: "POST",
    data: $(board).serialize(),
    success: function(response) {
      let board = new Board(response)
      clear();
      let url = `/users/${currentUID}/boards`
      listBoards(currentUID,url)
    }
  });
};

var deleteBoard = (board) => {
  $.ajax({
    url: board.dataset.url,
    type: "DELETE",
    data: $(board).serialize(),
    success: function(response) {
      clear();
      let uid = response.id;
      let url = `/users/${uid}/boards`;
      listBoards(uid,url);
    }
  });
};

var editBoard = (data) => {
  $.ajax({
    url: data.action,
    type: "PATCH",
    data: $(data).serialize(),
    success: function(response) {
      clear();
      let board = new Board(response);
      clear();
      $('.col-lg-12').append(`<h1>${board.name}</h1>`)
      if (board.outfits.length) {
        listOutfits(board.outfits);
      }
    }
  });
};

var clear = () => {$('.col-lg-12').empty()};
