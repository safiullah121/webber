let create = document.getElementById('create-notes');
let page2 = document.getElementById('page-2');
let page1 = document.getElementById('page-1');

function newdiv() {
  page1.style.display = "none";
  page2.style.display = "block";
}
function goto2() {
  page1.style.display = "block";
  page2.style.display = "none";
}

function newupdate() {
  let title = document.getElementById('title');
  let dis = document.getElementById('discription');
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
    localStorage.setItem("notes", JSON.stringify(notesarr));

  }
  else {
    notesarry = localStorage.getItem('notes');
    notesarr = JSON.parse(notesarry);
    notesarr.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    title.value = "",
      dis.value = ""
  }

  update();
  shownotes();
}

function update() {
  let mnotes = document.getElementById('m-notes');
  if (localStorage.getItem('notes') == null) {
    notesarr = [];
    localStorage.setItem("notes", JSON.stringify(notesarr));

  }
  else {
    notesarry = localStorage.getItem('notes');
    notesarr = JSON.parse(notesarry);
  }

}
function shownotes() {
  let mnotes = document.getElementById('m-notes');
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    notesarr = [];
  } else {
    notesarr = JSON.parse(notes);
  }
  let str = "";

  notesarr.forEach((element, index) => {
    const viewer=document.getElementsByClassName('viewer'); 
    const start = (new Date()/1000-element.created );
    const minutes = Math.floor((start / 60));

    if (minutes < 1) {
      str += `<div id="m-notes">
      <div class="viewer" onclick="viewer(this,${element.id})" id=${element.id}><h3>${element.title}</h3>
      <p class"times">Created Time: Just Now</p>
    </div> 
    </div> `;
    } else if (minutes === 1) {
      str += `<div id="m-notes">
        <div class="viewer" onclick="viewer(this,${element.id})" id=${element.id}><h3>${element.title}</h3>
        <p class"times">Created Time: 1 minute ago</p>
      </div> 
    </div> `;
    } else if (minutes < 60) {
      str += `<div id="m-notes">
        <div class="viewer" onclick="viewer(this,${element.id})" id=${element.id}><h3>${element.title}</h3>
        <p class"times">Created Time: ${minutes} minutes ago</p>
      </div> 
    </div> `;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      str += `<div id="m-notes">
        <div class="viewer" onclick="viewer(this,${element.id})" id=${element.id}><h3>${element.title}</h3>
        <p class"times">Created Time: ${hours} hour ago</p>
      </div>
      </div>`;
    } else {
      const days = Math.floor(minutes / 1440);
      str += `<div id="m-notes">
        <div class="viewer" onclick="viewer(this,${element.id})" id=${element.id}><h3>${element.title}</h3>
        <p class"times">Created Time: ${days} days ago</p>
      </div> 
    </div> `;
    }
  });   
  mnotes.innerHTML = str;
 
  if (notesarr.length === 0) {
    mnotes.innerHTML = "No Notes To Show!";
  }

}


let add = document.getElementById('add-button');
add.addEventListener("click", newupdate);
update();
shownotes();
function viewer(event, id) {
  page1.style.display = "none";
  page2.style.display = "block";
  let notes = localStorage.getItem('notes');
  let title = document.getElementById('title');
  let dis = document.getElementById('discription');
  if (notes == null) {
    notesarr = [];
  } else {
    notesarr = JSON.parse(notes);
  }
 
  const selectedNote = notesarr.find((i)=>i.id === id);
  title.value = selectedNote.title;
  dis.value = selectedNote.discription;
  localStorage.setItem("notes", JSON.stringify(notesarr));
  add.innerHTML = "Update Notes";
  add.removeEventListener("click", newupdate);
  add.addEventListener("click", updateNote);

  function updateNote() {
    selectedNote.title = title.value;
    selectedNote.discription = dis.value;
    selectedNote.updated = Date.now() / 1000;

    localStorage.setItem("notes", JSON.stringify(notesarr))
    title.value = "";
    dis.value = "";
    page1.style.display = "block";
    page2.style.display = "none";
    shownotes();
    add.innerHTML = "Add Note";
    add.removeEventListener("click", updateNote,);
    add.addEventListener("click", newupdate);
    location.reload()
  }
  function removeNote(id) {
   let notes=localStorage.getItem('notes')
   notesarr=JSON.parse(notes);
   const selectedNotes = notesarr.filter((saif)=>saif.id !== id);
   localStorage.setItem('notes',JSON.stringify(selectedNotes))
   page1.style.display = "block";
   page2.style.display = "none";
   title.value=""
   dis.value=""
   shownotes()
  }
document.getElementById('removenotes').addEventListener("click",()=>{

  removeNote(id)
})  
}
let search=document.getElementById('filter');
let mnotes = document.getElementById('m-notes');
search.addEventListener("input",function(){   
  let inputval=search.value
  let note=document.getElementsByClassName('viewer');
  let notes=localStorage.getItem('notes');
  Array.from(note).forEach(function (element) {
    let card =element.getElementsByTagName("h3")[0].innerText;
    let note=document.getElementsByClassName('viewer');
    if (card.includes(inputval)) {
      element.style.display="block"
    }
    else {
      element.style.display="none"
    }
  })
})
function sortNotes() {
  let sortValue = parseInt(sortSelect.value);
  let notes = localStorage.getItem('notes');
  console.log()
  if (notes == null) {
    return;
  }
  
  let notesArr = JSON.parse(notes);
    if (sortValue==0) {
      notesArr.sort((a, b) => b.updated - a.updated)
    }
   if (sortValue==1) {
      notesArr.sort((a, b) => a.title.localeCompare(b.title));
   }
  if (sortValue==2) {
       notesArr.sort((a, b) => b.created - a.created);
  }

  localStorage.setItem('notes', JSON.stringify(notesArr));
  shownotes();
}
let sortSelect = document.getElementById('sort');
sortSelect.addEventListener('change', sortNotes);