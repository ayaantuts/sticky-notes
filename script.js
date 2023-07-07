function colorgen() {
	let r, g, b;
	r = 128 - Math.floor(Math.random() * 127);
	g = 128 - Math.floor(Math.random() * 127);
	b = 128 - Math.floor(Math.random() * 127);
	r = r.toString(16).padStart(2, '0');
	g = g.toString(16).padStart(2, '0');
	b = b.toString(16).padStart(2, '0');
	let num = r + g + b;
	return "#" + num;
}
let notesArr = [];
function $(text, scope = document) {
	const el = scope.querySelectorAll(text);
	return el.length > 1 ? el : el[0];
}

const notes = $(".notes");
const plus = $(".notes > .create > .plus");
const submit = $(".inputGp .btn");

plus.addEventListener("click", () => {
	plus.parentElement.classList.add("write");
});

submit.addEventListener("click", () => {
	let parent = submit.parentNode;
	let note = {
		id: new Date().getTime(),
		heading: $("#heading", parent).value,
		content: $("#content", parent).value,
		color: colorgen()
	}
	addNote(note);
	notesArr.push(note);
	submit.parentNode.parentElement.classList.remove("write");
	updateLocal();
});

function addNote({ id, heading, content, color }) {
	if (heading === '' || content === '')
		return;

	const note = document.createElement('div');
	note.className = 'note hidden';
	note.dataset.id = id;
	const noteH = document.createElement('div');
	noteH.className = 'heading';
	noteH.innerText = heading.toString();
	const noteC = document.createElement('div');
	noteC.className = 'content';
	noteC.innerText = content.toString();
	const del = document.createElement('div');
	del.className = 'delete';
	del.innerHTML = "<i class='fas fa-trash'></i>"
	del.addEventListener('click', () => {
		for (let i = 0; i < notesArr.length; i++) {
			if (notesArr[i].id == del.parentElement.dataset.id) {
				notesArr.splice(i, 1);
			}
		}
		del.parentElement.remove();
		updateLocal();
	});
	note.appendChild(noteH);
	note.appendChild(noteC);
	note.appendChild(del);
	note.style.setProperty("--clr", color);
	notes.appendChild(note);
	setTimeout(() => {
		note.classList.remove("hidden");
	}, 200);
}

function updateLocal() {
	localStorage.setItem("notes", JSON.stringify(notesArr));
}

function loadLocal() {
	if (localStorage.getItem("notes") == null)
		return;

	notesArr = JSON.parse(localStorage.getItem("notes"));
	notesArr.forEach(n => {
		addNote(n);
	});
}

window.addEventListener("load", loadLocal);