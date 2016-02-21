/*
// -----------------------------------------------
Currently this file is incorrectly made
It should be using Express for the app handling, but right now,
it's just kind of its own standalone file
// -----------------------------------------------
*/


var gun = Gun();
var gunNotes = gun.get('notes');



$("#todo").keyup(function(event) {
    if(event.keyCode == 13){
      var data = {};
      data.title = $("#todo").val();
      data.subtitle = "";
		  gunNotes.path(Gun.text.random()).put(data); // add the HTML input's value to a random ID in the todo.
		  $("#todo").val(""); // clear out the input's value so we can add more.
    } // end if
});

$("#todoButton").click(function(event) {
  var data = {};
  data.title = $("#todo").val();
  data.subtitle = "";
	gunNotes.path(Gun.text.random()).put(data); // add the HTML input's value to a random ID in the todo.
	$("#todo").val(""); // clear out the input's value so we can add more.
});


gunNotes.on().map(function(thought, id) {
	console.log("thought, id:", thought, id);

	if (thought === null) {
		var noteToDelete = $("#" + id);

		if (noteToDelete) {
			noteToDelete.remove();
		} // end if
	} else {
		var newNote = createNewNote(thought, id);
		$("#todoListing").append(newNote);
	} // end if/else
});

$('body').on('dblclick', 'li', function(event) {
	gunNotes.path(this.id).put(null);
});


function createNewNote(data, noteId) {

	var newNote = document.createElement('div');
	newNote.id = noteId;
    newNote.className = "demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop";

	var noteTitle = document.createElement('div');
	noteTitle.className = "mdl-card__title mdl-card--expand mdl-color--teal-300";
	var noteTitleText = document.createElement('h2');
	noteTitleText.className = "mdl-card__title-text";
	noteTitleText.innerHTML = data.title;

	noteTitle.appendChild(noteTitleText);
	newNote.appendChild(noteTitle);

	var noteSupportingTitle = document.createElement('div');
	noteSupportingTitle.className = "mdl-card__supporting-text mdl-color-text--grey-600";
	noteSupportingTitle.innerHTML = data.subtitle;

	newNote.appendChild(noteSupportingTitle);

	var noteActions = document.createElement('div');
	noteActions.className = "mdl-card__actions mdl-card--border";
	var noteActionsLink = document.createElement('a');
	noteActionsLink.className = "mdl-button mdl-js-button mdl-js-ripple-effect";
	noteActionsLink.setAttribute("href", "#");
	noteActionsLink.innerHTML = "Delete";
	$(noteActionsLink).click(function () {
		console.log("Deleting note with id:", noteId);
		gunNotes.path(noteId).put(null);
	});


	noteActions.appendChild(noteActionsLink);
	newNote.appendChild(noteActions);


	componentHandler.upgradeElement(newNote);
	return newNote;
} // end createNewNote()

/*
When creating new elements while using material design lite,
you need to do this in order for things to reder properly

	var button = document.createElement('button');
	var textNode = document.createTextNode('Click Me!');
	button.appendChild(textNode);
	button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';
	componentHandler.upgradeElement(button);
	document.getElementById('container').appendChild(button);
*/
