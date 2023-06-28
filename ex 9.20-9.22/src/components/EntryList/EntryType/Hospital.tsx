import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { Diagnosis, HospitalEntry } from "../../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Tooltip from "@mui/material/Tooltip";
import DiagnosisCode from "./DiagnosisCode";


interface PropsHospital {
    entry: HospitalEntry;
    diagnoses: Diagnosis[]
}

const Hospital = ({ entry, diagnoses }: PropsHospital) => {

    return (
        <>
            <Box sx={{ pt: 3, display: 'flex' }}>
                <Typography variant="body1">date: <strong>{entry.date}</strong></Typography>
                <Tooltip title='Hospital'>
                    <MedicalServicesIcon sx={{ ml: 3 }} />
                </Tooltip>
            </Box>
            <br />
            <Box>
                <Typography variant="body1">description: <em>{entry.description}</em></Typography>
                <br />
                {entry.diagnosisCodes && <>
                    <Typography variant="body1">diagnoses: </Typography>
                    <DiagnosisCode diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
                </>}
                <br />
                <Typography variant="body1">descharge date: {entry.discharge.date}</Typography>
                <br />
                <Typography variant="body1">criteria: {entry.discharge.criteria}</Typography>
                <br />
                <Typography variant="body1">diagnose by: {entry.specialist}</Typography>
            </Box>
            <Divider sx={{ p: 1 }} />
        </>
    )
}
export default Hospital;