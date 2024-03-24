import useNoteStore from "../stores/noteStore";
import { Link } from "react-router-dom";
import Note from "../Components/Note";
import "./AllNotes.css"; // Import the CSS file

export default function AllNotes() {
  const store = useNoteStore();
  return (
    <div className="note-container"> {/* Apply the note-container class */}
      <Link to="/logout">Logout</Link>
      <h2>===Notes===</h2>
      {store.notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}
