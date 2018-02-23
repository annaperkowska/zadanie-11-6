$(function() {

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


function Board(boardName) {
    var self = this;

    this.id = randomString();
    this.boardName = prompt('Enter the board name');
    this.$element = createBoard();

    function createBoard() {
        var $board = $('<div>').addClass('board');
        var $boardId = $('<p>').addClass('board-id').text("Id: " + self.id);
        var $boardTitle = $('<h1>').addClass('board-title').text(self.boardName);
        var $boardDelete = $('<button>').addClass('btn-board-delete').text(' x ');
        var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');
        var $boardContainer = $('<div>').addClass('column-container');

        $boardDelete.click(function() {
        self.removeBoard();
        });

        $boardAddColumn.click(function(event) {
        self.addColumn(new Column(prompt("Enter the name of the column")));
        });

        $board.append($boardTitle)
        .append($boardDelete)
        .append($boardAddColumn)
        .append($boardId)
        .append($boardContainer);

        return $board;
    }
}

Board.prototype = {
    addColumn: function(column) {
        this.$element.children('div').append(column.$element);
    },
    removeBoard: function() {
        this.$element.remove();
    }
};

var content = {
    name: 'Kanban',
    addBoard: function(board) {
        this.$element.append(board.$element);
    },
    $element: $('#board-container')
};

$('.create-board')
  .click(function() {
    var board = new Board(name);
        content.addBoard(board);
  });


$('.add-column')
  .click(function() {
    var name = prompt('Enter a column name');
    var column = new Column(name);
        boardContainer.addColumn(column);
  });

function Column(name) {
	var self = this;

	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnId = $('<p>').addClass('column-id').text("Id: " + self.id);
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text(' x ');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
	
		$columnDelete.click(function() {
        self.removeColumn();
		});

    	$columnAddCard.click(function(event) {
        self.addCard(new Card(prompt("Enter the name of the card")));
		});

		$column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnId)
        .append($columnCardList);


    	return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};

function Card(description) {
	var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
    	var $card = $('<li>').addClass('card');
    	var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    	var $cardDelete = $('<button>').addClass('card-delete').text(' x ');

    $cardDelete.click(function() {
    	self.removeCard();
    });

    $card.append($cardDelete)
    	.append($cardDescription);

    return $card;
	}
}

Card.prototype = {
	removeCard: function() {
    	this.$element.remove();
    }
};


var bboard = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
}

$('.create-column')
  .click(function() {
	var name = prompt('Enter a column name');
	var column = new Column(name);
    	bboard.addColumn(column);
  });

$('.column-card-list').sortable();

// CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
bboard.addColumn(todoColumn);
bboard.addColumn(doingColumn);
bboard.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);

});




