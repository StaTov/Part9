import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { Paper, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Box from "@mui/system/Box";
import { pink } from "@mui/material/colors";


const PatientInfo = () => {
    const { id } = useParams()
    const [user, setUser] = useState<Patient | null>(null)

    useEffect(() => {
        if (id) {
            patientService.getById(id).then(response => {
                setUser(response.data)
                console.log('data', response.data)
            })
        }
    }, [id])

    if (!user) {
        return null
    }
    return (

        <Paper sx={{ p: 3, mt: 2.5 }} elevation={3}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h5" marginRight={2}>{user.name}</Typography>
                {user.gender === 'male' && <MaleIcon color="primary" fontSize="large" />}
                {user.gender === 'female' && <FemaleIcon sx={{ color: pink[500] }}  fontSize="large" />}
            </Box>
            <Typography sx={{ mt: 1 }} variant="body1">date of birth: {user.dateOfBirth}</Typography>
            <Typography variant="body1">ssn: {user.ssn}</Typography>
            <Typography variant="body1">occupation: {user.occupation}</Typography>
            <Typography>entries: {user.entries}</Typography>
        </Paper>



    )
}
export default PatientInfo;