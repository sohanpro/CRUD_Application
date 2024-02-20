//import NoteForm from "./Note_form"
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import axios from "axios";
import useNoteStore from "../stores/noteStore";
//import GetNote from "./Components/getNotes";
function App() {

    const store = useNoteStore();
//   const [createForm, setCreateForm] = useState({
//     title: "",
//     body: "",
//     type: "note",
//   });

  const [notes, setNotes] = useState([]);

  const [updateNote, setUpdateNote] = useState({
    _id: null,
    title: "",
    body: "",
    type: "note",
  });

  useEffect(() => {
    store.fetchNotes();
  }, []);
//   useEffect(() => {
    
//     setNotes(store.notes);
//   },[store.notes])

//   async function fetchNotes() {
//     try {
//       const res = await axios.get("http://localhost:3000/notes");
//       await setNotes(res.data.note);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   }

//   async function createNote() {
//     try {
//       await axios.post("http://localhost:3000/create", createForm);
//       //make the input field empty after add the note
//       setCreateForm({
//         title: "",
//         body: "",
//         type: "note",
//       });
//     } catch (error) {
//       console.error("Error creating note:", error);
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     await store.createNote();
//     await store.fetchNotes();
//   }

//   async function handleUpdateSubmit(e) {
//     const { value, name } = e.target;
//     setUpdateNote({
//       ...updateNote,
//       [name]: value,
//     });
//   }

//   function updateCreateField(e) {
//     const { name, value } = e.target;
//     setCreateForm({
//       ...createForm,
//       [name]: value,
//     });
//   }

//   async function Deletenote(_id) {
//     //delete the note
//     await axios.delete(`http://localhost:3000/delete-note/${_id}`);
//     //update the state
//     const newNotes = [...notes].filter((note) => {
//       return note._id !== _id;
//     });
//     setNotes(newNotes);
//   }
  function toggleUpdate(note) {
    //set state on update form
    setUpdateNote({
      _id: note._id,
      title: note.title,
      body: note.body,
      type: note.type,
    });
  }
  async function UpdateNote(e) {
    e.preventDefault();
    const { title, body, type } = updateNote;
    //Send the update request
    const res = await axios.put(
      `http://localhost:3000/edit-note/${updateNote._id}`,
      {
        title,
        body,
        type,
      }
    );

    //update state
    const newNote = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateNote._id;
    });
    newNote[noteIndex] = res.data.note;

    setNotes(newNote);

    //clear update form field
    setUpdateNote({
      _id: null,
      title: "",
      body: "",
      type: "note",
    });
  }
  return (
    <div>
      <div>
        <h2>===Notes===</h2>
        <table>
          <tr>
            <td>
              {store.notes.map((note) => (
                <div key={note._id}>
                  <h3>{note.title}</h3>
                  <button onClick={() => store.Deletenote(note._id)}>Delete</button>
                  <button onClick={() => toggleUpdate(note)}>Update</button>
                </div>
              ))}
            </td>
            <td>
              {updateNote._id && (
                
                <form onSubmit={UpdateNote} method="POST">
                  <label htmlFor="title">Title:</label>
                  <input
                    onChange={store.handleUpdateSubmit}
                    type="text"
                    id="title"
                    name="title"
                    value={store.updateNote.title}
                    placeholder="Enter title..."
                    required
                  />

                  <label htmlFor="body">Body:</label>
                  <textarea
                    onChange={handleUpdateSubmit}
                    id="body"
                    name="body"
                    value={store.updateNote.body}
                    rows="4"
                    placeholder="Enter details..."
                    required
                  ></textarea>

                  <label htmlFor="type">Type:</label>
                  <select
                    onChange={handleUpdateSubmit}
                    id="type"
                    name="type"
                    value={store.updateNote.type}
                  >
                    <option value="note">Note</option>
                    <option value="quickNote">Quick Note</option>
                  </select>

                  <button type="submit">Submit</button>
                </form>
              )}
            </td>
          </tr>
        </table>
      </div>
      <div className="container">
        <form onSubmit={store.handleSubmit} method="POST">
          <label htmlFor="title">Title:</label>
          <input
            onChange={store.updateCreateField}
            type="text"
            id="title"
            name="title"
            value={store.createForm.title}
            placeholder="Enter title..."
            required
          />

          <label htmlFor="body">Body:</label>
          <textarea
            onChange={store.updateCreateField}
            id="body"
            name="body"
            value={store.createForm.body}
            rows="4"
            placeholder="Enter details..."
            required
          ></textarea>

          <label htmlFor="type">Type:</label>
          <select
            onChange={store.updateCreateField}
            id="type"
            name="type"
            value={store.createForm.type}
          >
            <option value="note">Note</option>
            <option value="quickNote">Quick Note</option>
          </select>

          <button type="submit">Submit</button>
        </form>

        {/* Pass refresh function to GetNote component */}
      </div>
    </div>
  );
}
export default App;
