import { NoteType } from "../types"

const Note = (props: {
    note: null | string,
    setNote: React.Dispatch<React.SetStateAction<NoteType>>
}) => {
    const style = {
        color: 'red',
        border: 'solid',
        borderColor: 'red',
        padding: 3
    }
   
    if (!props.note) {
        return null
    }
    setTimeout(() => { props.setNote(null) }, 5000)
    return (
        <div style={style}>{props.note}</div>
    )
}

export default Note;