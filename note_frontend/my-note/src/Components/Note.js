import useNoteStore from "../stores/noteStore";
import "./AllNotes.css"; // Import the CSS file

export default function Note({ note }) {
  const store = useNoteStore((store) => ({
    Deletenote: store.Deletenote,
    toggleUpdate: store.toggleUpdate,
  }));

  return (
    <div className={`note-card ${note.deleted ? "deleted" : ""}`}> {/* Apply the note-card class with condition */}
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-buttons">
          <button onClick={() => store.Deletenote(note._id)} className="delete-btn"> {/* Apply the delete-btn class */}
            Delete
          </button>
          <button onClick={() => store.toggleUpdate(note)} className="update-btn"> {/* Apply the update-btn class */}
            Update
          </button>
        </div>
      </div>
      <p className="note-body">{note.body}</p>
      <div className="note-type">{note.type}</div>
    </div>
  );
}
