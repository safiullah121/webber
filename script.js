// Function to add a note
function addNote() {
    const title = document.getElementById('note-title').value;
    const details = document.getElementById('note-details').value;
  
    if (title.trim() !== '' && details.trim() !== '') {
      const note = {
        title: title,
        details: details
      };
  
      let notes = getNotesFromLocalStorage();
      notes.push(note);
      saveNotesToLocalStorage(notes);
  
      displayNotes();
      clearInputs();
    }
  }
  
  // Function to display all notes
  function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
  
    let notes = getNotesFromLocalStorage();
  
    notes.forEach(function(note, index) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.innerHTML = '<h3>' + note.title + '</h3>' + '<p>' + note.details + '</p>' +
        '<button onclick="editNote(' + index + ')">Edit</button>' +
        '<button onclick="removeNote(' + index + ')">Remove</button>';
  
      notesList.appendChild(noteDiv);
    });
  }
  
  // Function to edit a note
  function editNote(index) {
    let notes = getNotesFromLocalStorage();
  
    const note = notes[index];
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-details').value = note.details;
  
    notes.splice(index, 1);
    saveNotesToLocalStorage(notes);
  
    displayNotes();
  }
  
  // Function to remove a note
  function removeNote(index) {
    let notes = getNotesFromLocalStorage();
    notes.splice(index, 1);
    saveNotesToLocalStorage(notes);
    displayNotes();
  }
  
  // Function to retrieve notes from local storage
  function getNotesFromLocalStorage() {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
      return [];
    } else {
      return JSON.parse(notes);
    }
  }
  
  // Function to save notes to local storage
  function saveNotesToLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  
  // Function to clear input fields
  function clearInputs() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-details').value = '';
  }
  
  // Initial display of notes
  displayNotes();