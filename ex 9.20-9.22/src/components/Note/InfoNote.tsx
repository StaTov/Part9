import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

interface NoteProps {
    infoMessage: string | null;
    setInfoMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const InfoNote = ({ infoMessage, setInfoMessage }: NoteProps) => {

    if (infoMessage) {
        setTimeout(() => {
            setInfoMessage(null)
        }, 7000)
    }
    return (
        <Box sx={{  m: 2 }}>
            <Collapse in={infoMessage !== null}>
                <Alert icon={false} severity="success">
                    {infoMessage}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default InfoNote;