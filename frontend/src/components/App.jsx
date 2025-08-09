import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Load notes from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // Add a note (POST request)
  function addNote(newNote) {
    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then((res) => res.json())
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote]);
      })
      .catch((err) => console.error("Error adding note:", err));
  }

  // Delete a note (DELETE request)
  function deleteNote(id) {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((err) => console.error("Error deleting note:", err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
