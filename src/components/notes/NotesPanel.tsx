import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
  notes: Task['notes']
}

export default function NotesPanel({notes} : NotesPanelProps) {
  return (
  <>
      <AddNoteForm />

      {notes.length ? (
        <>
          {notes.map(note => <NoteDetail key={note._id} note={note} />)}
        </>
      ) : <p className="text-gray-500 text-center pt-3">No comments yet</p>}
    </>
  )
}
