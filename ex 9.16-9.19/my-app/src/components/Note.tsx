import { NoteType } from "../types"


const Note = ({ note, setNote}: NoteType) => {
    const style = {
        color: 'red',
        border: 'solid',
        borderColor: 'red',
        padding: 3
    }

    if (!note) {
        return null
    }
    setTimeout(() => { setNote(null) }, 5000)
    return (
        <div style={style}>{note}</div>
    )
}

export default Note;