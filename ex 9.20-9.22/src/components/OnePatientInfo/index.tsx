import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses"
import { Button, Paper, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Box from "@mui/system/Box";
import { pink } from "@mui/material/colors";
import React from "react";
import EntryDetails from "../EntryList";
import EntryForm from "../EntryForm";


const PatientInfo = () => {
    const { id } = useParams()
    const [user, setUser] = useState<Patient | null>(null)
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null)
    const [showForm, setShowForm] = useState<true | false>(false)

    const handleClick = () => setShowForm(!showForm)

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
                <Typography sx={{ mt: 1 }} variant="body2">date of birth: {user.dateOfBirth}</Typography>
                <Typography variant="body2">ssn: {user.ssn}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Typography variant="body2">occupation: {user.occupation}</Typography>
                    <Button disabled={showForm} variant="contained" color="primary" type="button" onClick={handleClick}>ADD NEW ENTRY</Button>
                </Box>
            </Paper>
            {showForm &&
                <Paper sx={{ p: 3, mt: 2.5 }} elevation={3}>
                    <EntryForm diagnoses={diagnoses}/>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="error" type="button" onClick={handleClick}>CLOSE</Button>
                    </Box>
                </Paper>}
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