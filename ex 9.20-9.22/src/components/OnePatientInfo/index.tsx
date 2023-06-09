import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses"
import { Paper, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Box from "@mui/system/Box";
import { pink } from "@mui/material/colors";
import React from "react";
import EntryDetails from "./EntryDetails";


const PatientInfo = () => {
    const { id } = useParams()
    const [user, setUser] = useState<Patient | null>(null)
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>()
    useEffect(() => {
        if (id) {
            patientService.getById(id).then(response => {
                setUser(response.data)
            });
            diagnosesService.getAll().then(response => {
                setDiagnoses(response.data)
            });
        }
    }, [id])

    if (!user) {
        return null
    }
    if (!diagnoses) {
        return null
    }

    return (
        <Box>

            <Paper sx={{ p: 3, mt: 2.5 }} elevation={3}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5" marginRight={2}><strong>{user.name}</strong></Typography>
                    {user.gender === 'male' && <MaleIcon color="primary" fontSize="large" />}
                    {user.gender === 'female' && <FemaleIcon sx={{ color: pink[500] }} fontSize="large" />}
                </Box>
                <Typography sx={{ mt: 1 }} variant="body1">date of birth: {user.dateOfBirth}</Typography>
                <Typography variant="body1">ssn: {user.ssn}</Typography>
                <Typography variant="body1">occupation: {user.occupation}</Typography>
            </Paper>
            <Paper sx={{ pl: 3, pt: 1, pb: 3, pr: 3, mt: 2.5 }} elevation={3}>
                <Typography sx={{ mt: 1 }} variant="h6"><strong>entries</strong></Typography>
                <Box>
                    {user.entries.length === 0 
                    ? <Typography mt={2} variant="body2">not found...</Typography>
                    : user.entries.map(e =>
                        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />)}
                </Box>
            </Paper>
        </Box>
    )
}
export default PatientInfo;