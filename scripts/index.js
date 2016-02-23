/*
// -----------------------------------------------
Currently this file is incorrectly made
It should be using Express for the app handling, but right now,
it's just kind of its own standalone file
// -----------------------------------------------
*/


var gun = Gun();
var gunNotes = gun.get('notes');

function createNote() {
	var data = {};
	data.title = $("#add-todo-textbox").val();
	data.subtitle = "";

	console.log("Adding note with data:", data);
	gunNotes.path(Gun.text.random()).put(data); // add the HTML input's value to a random ID in the todo.
	$("#add-todo-textbox").val(""); // clear out the input's value so we can add more.
} // end createNote()

function deleteNote(noteId) {
	console.log("Deleting note with id:", noteId);
	gunNotes.path(noteId).put(null);
} // end deleteNote

function editNote(noteId, field, newData) {
	console.log("Editing note:", noteId);
	console.log("The field:", field);
	console.log("With data:", newData);


} // end editNote()




$("#add-todo-textbox").keyup(function(event) {
    if(event.keyCode == 13) {
		if ($("#add-todo-textbox").val() !== "") {
			createNote();
		} // end if()
    } // end if
});

$("#add-todo-button").click(function(event) {
	if ($("#add-todo-textbox").val() !== "") {
		createNote();
	} // end if()
});


gunNotes.on().map(function(noteData, id) {
	console.log("noteData, id:", noteData, id);

	if (noteData === null) {
		var noteToDelete = $("#" + id);

		// If the html element exists, remove it
		if (noteToDelete) {
			noteToDelete.remove();
		} // end if
	} else {
		// Check to see if the element already exists
		if (!document.getElementById(id)) {
			var newNote = constructNewNote(noteData, id);
			$("#todoListing").prepend(newNote);
		} // end if
	} // end if/else
});


function constructNewNote(noteData, noteId) {
	var newNote = document.createElement('div');
	newNote.id = noteId;
    newNote.className = "demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--4-col-desktop";

	var noteTitle = document.createElement('div');
	noteTitle.className = "mdl-card__title mdl-card--expand mdl-color--teal-300";
	var noteTitleText = document.createElement('h2');
	noteTitleText.className = "mdl-card__title-text";
	noteTitleText.innerHTML = noteData.title;

	noteTitle.appendChild(noteTitleText);
	newNote.appendChild(noteTitle);

	var noteSupportingTitle = document.createElement('div');
	noteSupportingTitle.className = "mdl-card__supporting-text mdl-color-text--grey-600";
	noteSupportingTitle.innerHTML = noteData.subtitle;

	newNote.appendChild(noteSupportingTitle);

	var noteActions = document.createElement('div');
	noteActions.className = "mdl-card__actions mdl-card--border";
	var noteActionsLink = document.createElement('a');
	noteActionsLink.className = "mdl-button mdl-js-button mdl-js-ripple-effect";
	noteActionsLink.setAttribute("href", "#");
	noteActionsLink.innerHTML = "Delete";
	$(noteActionsLink).click(function () {
		deleteNote(noteId);
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
