import Content from "./components/Content";
import { DiaryEntries, NoteType } from "./types";
import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import DiaryForm from "./components/DiaryForm";
import Note from "./components/Note";


function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntries[]>([]);
  const [note, setNote] = useState<NoteType>(null)


  useEffect(() => {
    diaryService.getAll().then(response => {
      setDiaryEntries(response)
    })
  }, [])

  if (!diaryEntries) {
    return null
  }
  return (
    <div>
      <h1>Diary Entries</h1>
      <Note note={note} setNote={setNote}/>
      <DiaryForm  setNote={setNote} diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} />
      <Content diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
