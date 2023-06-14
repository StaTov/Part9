import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

interface NoteProps {
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}


const ErrorNote = ({ errorMessage, setErrorMessage }: NoteProps) => {

    if (errorMessage) {
        setTimeout(() => {
            setErrorMessage(null)
        }, 7000)
    }

    return (
        <Box sx={{  m: 2 }}>
            <Collapse in={errorMessage !== null}>
                <Alert icon={false} severity="error">
                    {errorMessage}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default ErrorNote;