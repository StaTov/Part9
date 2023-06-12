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
            <Box sx={{ display: 'flex' }}>

                <Typography variant="subtitle1">{entry.date}</Typography>
                <Tooltip title='Hospital'>
                    <MedicalServicesIcon sx={{ ml: 3 }} />
                </Tooltip>
            </Box>
            <Typography variant="body2"><em>{entry.description}</em></Typography>
            {entry.diagnosisCodes && <>
                <Typography variant="body2">diagnoses: </Typography>
                <DiagnosisCode diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
            </>}
            <br />
            <Typography variant="body2">descharge date: {entry.discharge.date}</Typography>
            <Typography variant="body2">{entry.discharge.criteria}</Typography>
            <br />
            <Typography variant="body2">diagnose by {entry.specialist}</Typography>

            <Divider sx={{ pt: 1 }} />
        </>
    )
}
export default Hospital;