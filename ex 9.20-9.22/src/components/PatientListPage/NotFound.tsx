import Typography from "@mui/material/Typography"
import { Patient } from "../../types";

interface PropsNotFound {
    patients: Patient[]
}

const NotFound = ({patients}: PropsNotFound) => {
    if(patients.length > 0){
        return null
    }
    return (
        <Typography sx={{ p: 3}} align="center" variant="h6">
            Not found ...
        </Typography>
    )
}

export default NotFound;
