import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import DiagnosisCode from "./DiagnosisCode";
import WorkIcon from '@mui/icons-material/Work';

interface PropsOccupationHealth {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}
const OccupationHealthcare = ({ entry, diagnoses }: PropsOccupationHealth) => {
    return (
        <Box sx={{ mb: 3, mt: 3 }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="body1">date: <strong>{entry.date}</strong></Typography>
                <Tooltip title='OccupationalHealthcare'>
                    <WorkIcon sx={{ ml: 3 }} />
                </Tooltip>
                <br />
                <Typography ml={1} variant="body1">{entry.employerName}</Typography>
            </Box>
            <br />
            <Typography variant="body1"><em>description: {entry.description}</em></Typography>
            <br />
            {entry.diagnosisCodes &&
                <>
                    <Typography variant="body1">diagnoses: </Typography>
                    <DiagnosisCode diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
                </>}
            <br />
            <Typography variant="body1">diagnose by: {entry.specialist}</Typography>
            <Divider sx={{ pt: 1, pb: 1 }} />
        </Box>
    )
}
export default OccupationHealthcare;