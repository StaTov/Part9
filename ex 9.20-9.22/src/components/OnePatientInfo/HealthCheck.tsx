
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box";
import { brown, green, yellow } from '@mui/material/colors';
import red from '@mui/material/colors/red';
import Divider from '@mui/material/Divider';
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { Diagnosis, HealthCheckEntry } from "../../types";
import DiagnosisCode from './DiagnosisCode';

interface PropsHealthCheck {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}
const HealthCheck = ({ entry, diagnoses }: PropsHealthCheck) => {

    const getColor = (n: number): string => {
        switch (n) {
            case 0:
                return green['A700']
            case 1:
                return yellow['A700']
            case 2:
                return red['A700']
            case 3:
                return brown[900]
            default:
                throw new Error('Incorect data: ' + n)
        }
    }
    const color = getColor(entry.healthCheckRating)

    return (<Box sx={{ mb: 3, mt: 3 }}>
        <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1">{entry.date}</Typography>
          
            <Tooltip title='Health Check'>
                <FavoriteIcon sx={{ color: { color }, ml: 3 }} />
            </Tooltip>
        </Box>
        <br />
        <Typography variant="body2"><em>{entry.description}</em></Typography>
        {entry.diagnosisCodes && <>
            <Typography variant="body2">diagnoses: </Typography>
            <DiagnosisCode diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </>}
        <br />
        <Typography variant="body2">diagnose by {entry.specialist}</Typography>
        <Divider sx={{ pt: 1, pb: 1 }} />
    </Box>
    )
}
export default HealthCheck;