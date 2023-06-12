let create = document.getElementById('create-notes');
let page2 = document.getElementById('page-2');
let page1 = document.getElementById('page-1');
let notes = localStorage.getItem("notes")
let title = document.getElementById('title');
let dis = document.getElementById('discription');
let id = null;

function pagechanger2() {
  page1.style.display = "none"
  page2.style.display = "block"
}
function pagechanger1() {
  page1.style.display = "block"
  page2.style.display = "none"
}

function createnotes() {
  title = document.getElementById('title');
  dis = document.getElementById('discription');
  let myobj = {
    title: title.value,
    discription: dis.value,
    created: Date.now() / 1000,
    updated: "",
    id: Math.random()
  }
  if (localStorage.getItem('notes') == null) {
    notesarr = [];
    notesarr.push(myobj);
  }
  else {
    notesarry = localStorage.getItem('notes');
    notesarr = JSON.parse(notesarry);
    notesarr.push(myobj);
    title.value = "",
      dis.value = ""
  }
  localStorage.setItem("notes", JSON.stringify(notesarr));
  shownotes();
}
function shownotes(e, element) {
  let mnotes = document.getElementById('m-notes');
  notes = localStorage.getItem('notes');

  if (notes == null) {
    notesarr = [];
  } else {
    notesarr = JSON.parse(notes);
  }
  let str = "";

  notesarr.forEach((element) => {
    let time = "";
    const start = (new Date() / 1000 - element.created);
    const minutes = Math.floor(start / 60);
    if (minutes < 1) {
      time = "Just Now";
    } else if (minutes === 1) {
      time = "1 minute ago";
    } else if (minutes < 60) {
      time = `${minutes} minutes ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      time = `${hours} hour ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      time = `${days} days ago`;
    }

    str += `<div id="m-notes">
      <div class="viewer" onclick="viewer(this,${element.id})">
        <h3>${element.title}</h3>
        <p class"times">Created Time: ${time}</p>
      </div> 
    </div>`;
  });
  mnotes.innerHTML = str;
  if (notesarr.length === 0) {
    mnotes.innerHTML = "No Notes To Show!";
  }

}


let add = document.getElementById('add-button');
add.addEventListener("click", createnotes);
shownotes();
function viewer(event, parentId) {
  id = parentId
  pagechanger2()
  notes = localStorage.getItem('notes');
  title = document.getElementById('title');
  dis = document.getElementById('discription');
  if (notes == null) {
    notesarr = [];
  } else {
    notesarr = JSON.parse(notes);
  }

  const selectedNote = notesarr.find((i) => i.id === parentId);
  title.value = selectedNote.title;
  dis.value = selectedNote.discription;

  add.innerHTML = "Update Notes";
  add.removeEventListener("click", createnotes);
  add.addEventListener("click", updateNote);

  function updateNote() {
    selectedNote.title = title.value;
    selectedNote.discription = dis.value;
    selectedNote.updated = Date.now() / 1000;

    localStorage.setItem("notes", JSON.stringify(notesarr))
    title.value = "";
    dis.value = "";
    pagechanger1()
    shownotes();
    add.innerHTML = "Add Note";
    add.removeEventListener("click", updateNote,);
    add.addEventListener("click", createnotes);
  }
  localStorage.setItem("notes", JSON.stringify(notesarr));
}
document.getElementById('removenotes').addEventListener("click", () => {
  removeNote(id)
})
function removeNote(id) {
  notes = localStorage.getItem('notes')
  notesarr = JSON.parse(notes);
  const selectedNotes = notesarr.filter((saif) => saif.id !== id);
  localStorage.setItem('notes', JSON.stringify(selectedNotes))
  title.value = ""
  dis.value = ""
  pagechanger1()
  shownotes()
}

let search = document.getElementById('filter');
let mnotes = document.getElementById('m-notes');
search.addEventListener("input", function () {
  let inputval = search.value
  let note = document.getElementsByClassName('viewer');
  notes = localStorage.getItem('notes');
  Array.from(note).forEach(function (element) {
    let card = element.getElementsByTagName("h3")[0].innerText;
    if (card.includes(inputval)) {
      element.style.display = "block"
    }
    else {
      element.style.display = "none"
    }
  })
})
function sortNotes() {
  let sortValue = parseInt(sortSelect.value);
  localStorage.getItem('notes');
  console.log()
  if (notes == null) {
    return;
  }

  let notesArr = JSON.parse(notes);
  if (sortValue == 0) {
    notesArr.sort((a, b) => b.updated - a.updated)
  }
  if (sortValue == 1) {
    notesArr.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortValue == 2) {
    notesArr.sort((a, b) => b.created - a.created);
  }

  localStorage.setItem('notes', JSON.stringify(notesArr));
  shownotes();
}
let sortSelect = document.getElementById('sort');
sortSelect.addEventListener('change', sortNotes);