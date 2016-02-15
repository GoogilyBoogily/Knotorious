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
		gunNotes.path(Gun.text.random()).put($("#todo").val()); // add the HTML input's value to a random ID in the todo.
		$("#todo").val(""); // clear out the input's value so we can add more.
    } // end if
});

$("#todoButton").click(function(event) {
	gunNotes.path(Gun.text.random()).put($("#todo").val()); // add the HTML input's value to a random ID in the todo.
	$("#todo").val(""); // clear out the input's value so we can add more.
});

/*
gunNotes.on(function(list) { // subscribe and listen to all updates on the todo.
	var html = ''; // old school HTML strings! You should probably use a real template system.
	for(field in list) { // iterate over the list to generate the HTML.
		if(!list[field] || field == Gun._.meta) continue; // ignore nulled out values and metadata.
		html += '<li>'
			+ clean(list[field])
			+ '<button style="float:right;" onclick=todone("'+ field +'")>X</button>'
		+ '</li>';
	}

	$("#todos").innerHTML = html; // set the HTML to our new list.
});


window.todone = function(field){
	gunNotes.path(field).put(null); // null out the todo item on this field ID.
}
*/


gunNotes.on().map(function(thought, id) {
	console.log("thought, id:", thought, id);

	//var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');

	var newNote = createNewNote(thought, id);
	$("#todoListing").append(newNote);
});

$('body').on('dblclick', 'li', function(event) {
	gunNotes.path(this.id).put(null);
});


function createNewNote(data, noteId) {

	var newNote = document.createElement('div');
	newNote.id = noteId;
    newNote.className = "demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop";

	var noteTitle = document.createElement('div');
	noteTitle.className = "mdl-card__title mdl-card--expand mdl-color--teal-300"
	var noteTitleText = document.createElement('h2');
	noteTitleText.className = "mdl-card__title-text";
	noteTitleText.innerHTML = data;

	noteTitle.appendChild(noteTitleText);
	newNote.appendChild(noteTitle);

	var noteSupportingTitle = document.createElement('div');
	noteSupportingTitle.className = "mdl-card__supporting-text mdl-color-text--grey-600";
	noteSupportingTitle.innerHTML = "Extra text area";

	newNote.appendChild(noteSupportingTitle);

	var noteActions = document.createElement('div');
	noteActions.className = "mdl-card__actions mdl-card--border";
	var noteActionsLink = document.createElement('a');
	noteActionsLink.className = "mdl-button mdl-js-button mdl-js-ripple-effect";
	noteActionsLink.setAttribute("href", "#");
	noteActionsLink.innerHTML = "Link";

	noteActions.appendChild(noteActionsLink);
	newNote.appendChild(noteActions);


	componentHandler.upgradeElement(newNote);
	return newNote;
} // end createNewNote()

/*
<div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
	<div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
		<h2 class="mdl-card__title-text">Updates</h2>
	</div>
	<div class="mdl-card__supporting-text mdl-color-text--grey-600">
		Non dolore elit adipisicing ea reprehenderit consectetur culpa.
	</div>
	<div class="mdl-card__actions mdl-card--border">
		<a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a>
	</div>
</div>
*/

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
