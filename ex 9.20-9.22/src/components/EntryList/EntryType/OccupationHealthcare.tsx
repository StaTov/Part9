import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
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
                <Typography variant="subtitle1">{entry.date}</Typography>
                <Tooltip title='OccupationalHealthcare'>
                    <WorkIcon sx={{ ml: 3 }} />
                </Tooltip>
                <Typography ml={1} variant="subtitle1">{entry.employerName}</Typography>
            </Box>
            <br />
            <Typography variant="body2"><em>{entry.description}</em></Typography>
            {entry.diagnosisCodes &&
                <>
                    <Typography variant="body2">diagnoses: </Typography>
                    <DiagnosisCode diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
                </>}
            <br />
            <Typography variant="body2">diagnose by {entry.specialist}</Typography>
            <Divider sx={{ pt: 1, pb: 1 }} />
        </Box>
    )
}
export default OccupationHealthcare;