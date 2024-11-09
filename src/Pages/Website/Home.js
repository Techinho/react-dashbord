import { useState } from "react";
import Header from "../../components/Header";

export default function Home() {
  const [note, setNote] = useState(""); // Single note input
  const [notes, setNotes] = useState([]); // Array of notes

  function submit(e) {
    e.preventDefault();
    // Handle form submission if needed
  }

  function ajouter() {
    if (note.trim()) {
      // Only add the note if it's not empty
      setNotes([...notes, note]); // Add the new note to the array
      setNote(""); // Clear the input field after adding
    }
  }

  function supprimer(index) {
    const updatedNotes = notes.filter((_, i) => i !== index); // Remove the note at the given index
    setNotes(updatedNotes); // Update the state with the new notes array
  }

  // Inline styles for the layout and form/notes
  const styles = {
    container: {
      display: "flex", // Flexbox container
      justifyContent: "space-between",
      padding: "20px",
    },
    formContainer: {
      flex: "1", // Takes 1 part of the screen
      marginRight: "20px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    },
    inputField: {
      padding: "10px",
      width: "100%",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    buttonAdd: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    notesContainer: {
      flex: "1", // Takes 1 part of the screen
      marginLeft: "20px",
    },
    noteItem: {
      backgroundColor: "#f1f1f1",
      padding: "15px",
      borderRadius: "4px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    buttonDelete: {
      backgroundColor: "#f44336",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        {/* Form on the left */}
        <form style={styles.formContainer} onSubmit={submit}>
          <h2>Set note:</h2> <br />
          <input
            type='text'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.inputField}
            placeholder='Enter your note...'
          />
          <button type='button' onClick={ajouter} style={styles.buttonAdd}>
            Ajouter
          </button>
        </form>

        {/* Notes on the right */}
        <div style={styles.notesContainer}>
          {notes.map((note, index) => (
            <div key={index} style={styles.noteItem}>
              <h3>
                <i
                  class='fa-solid fa-note-sticky'
                  style={{ color: "green" }}
                ></i>{" "}
                {note}
              </h3>
              <button
                onClick={() => supprimer(index)}
                style={styles.buttonDelete}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
