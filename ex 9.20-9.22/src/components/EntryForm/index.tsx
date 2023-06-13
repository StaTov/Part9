import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { brown, red, yellow, green } from '@mui/material/colors';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Diagnosis, HealthCheckRating, Type } from "../../types";

interface PropsEntryForm {
    diagnoses: Diagnosis[];
}

const EntryForm = ({ diagnoses }: PropsEntryForm) => {

    const codeNames = diagnoses.map(d => d.code)
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [code, setCode] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const [type, setType] = useState<Type>(Type.HealthCheck)
    const [dischargeDate, setDischargeDate] = useState('')
    const [criteria, setCriteria] = useState('')
    const [employerName, setEmployerName] = useState('')
    const [sickLeave, setSickLeave] = useState<string | undefined>()
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.LowRisk)

    const handleAddCode = () => {
        if (!code) {
            return console.log('missing code')
        }
        if (diagnosisCodes.includes(code)) {
            return console.log(`${code} alrady exist`)
        }
        const newDiagnosisCodes = [...diagnosisCodes, code]
        setDiagnosisCodes(newDiagnosisCodes)
    }
    const handleDeleteCode = () => {
        if (!diagnosisCodes) {
            return console.log('Incorrect data')
        }
        const newDiagnosisCodes = [...diagnosisCodes]
        newDiagnosisCodes.pop()
        setDiagnosisCodes(newDiagnosisCodes)

    }
    const handleType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (e.target.value) {
            case 'HealthCheck':
                return setType(Type.HealthCheck);
            case 'Hospital':
                return setType(Type.Hospital);
            case 'OccupationalHealthcare':
                return setType(Type.OccupationalHealthcare)
            default:
                console.log('Error handleType func')
                return
        }
    }
    const handleHealthCheckRating = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        switch (Number(e.target.value)) {
            case 0:
                return setHealthCheckRating(HealthCheckRating.Healthy);
            case 1:
                return setHealthCheckRating(HealthCheckRating.LowRisk);
            case 2:
                return setHealthCheckRating(HealthCheckRating.HighRisk)
            case 3:
                return setHealthCheckRating(HealthCheckRating.CriticalRisk)
            default:
                console.log('Error handleHealthCheckRating func')
                return
        }
    }

    return (
        <Box>
            <form>
                <Typography sx={{ mb: 1 }} variant="h6"><strong>ENTRY FORM</strong></Typography>
                <Box sx={{ mt: 0.4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography variant='h6' >Date and Type</Typography>
                    <TextField
                        size="small"
                        sx={{ mt: 1.2, alignSelf: 'flex-start' }}
                        required
                        helperText="please enter date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                    />
                    <TextField
                        helperText='please select type'
                        size="small"
                        value={type}
                        onChange={handleType}
                        select>
                        <MenuItem value={Type.HealthCheck}>
                            {Type.HealthCheck}
                        </MenuItem>
                        <MenuItem value={Type.Hospital}>
                            {Type.Hospital}
                        </MenuItem>
                        <MenuItem value={Type.OccupationalHealthcare}>
                            {Type.OccupationalHealthcare}
                        </MenuItem>
                    </TextField>
                    {type === 'Hospital' &&
                        <Box>
                            <Typography variant='h6'>Discharge</Typography>
                            <TextField
                                sx={{ mt: 1.2 }}
                                size="small"
                                type="date"
                                helperText="please enter discharge date"
                                required
                                value={dischargeDate}
                                onChange={(e) => setDischargeDate(e.target.value)}
                            />   <TextField
                                sx={{ width: '100%', mt: 1.2 }}
                                size="small"
                                required
                                multiline
                                label="criteria"
                                value={criteria}
                                onChange={(e) => setCriteria(e.target.value)}
                            />
                        </Box>
                    }

                    {type === 'HealthCheck' &&
                        <TextField
                            size="small"
                            value={healthCheckRating}
                            onChange={handleHealthCheckRating}
                            select>
                            <MenuItem value={HealthCheckRating.Healthy}>
                                Healthy  {< FavoriteIcon sx={{ mb: -0.5, pl: 4.4, color: green['A700'] }} />}
                            </MenuItem>
                            <MenuItem value={HealthCheckRating.LowRisk}>
                                LowRisk  {< FavoriteIcon sx={{ mb: -0.5, pl: 3.5, color: yellow['A700'] }} />}
                            </MenuItem>
                            <MenuItem value={HealthCheckRating.HighRisk}>
                                HighRisk {< FavoriteIcon sx={{ mb: -0.5, pl: 3, color: red['A700'] }} />}
                            </MenuItem>
                            <MenuItem value={HealthCheckRating.CriticalRisk}>
                                CriticalRisk {< FavoriteIcon sx={{ mb: -0.5, pl: 1, color: brown[900] }} />}
                            </MenuItem>
                        </TextField>
                    }
                    <Typography sx={{mt: 1.2}}variant='h6'>Description</Typography>
                    <TextField
                        sx={{ mt: 1.2 }}
                        size="small"
                        required
                        multiline
                        label="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                      <Typography sx={{mt: 1.2}}variant='h6'>Specialist</Typography>
                    <TextField
                        sx={{ mt: 1.2 }}
                        size="small"
                        required
                        label="specialist"
                        value={specialist}
                        onChange={(e) => setSpecialist(e.target.value)}
                    />
                     <Typography sx={{mt: 1.2}}variant='h6'>Diagnosis code</Typography>
                    <Box sx={{ mt: 1.2, display: 'flex', alignItems: 'center' }}>

                        <TextField
                            sx={{ mr: 1.2 }}
                            size="small"
                            select
                            value={code}
                            onChange={(e) => setCode(e.target.value)}>
                            {codeNames.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            disabled={!code}
                            sx={{ mr: 1.2 }}
                            size="medium"
                            variant="outlined"
                            onClick={handleAddCode}>
                            ADD
                        </Button>
                        <Button
                            color="error"
                            size="medium"
                            variant="outlined"
                            disabled={diagnosisCodes.length === 0}
                            onClick={handleDeleteCode}>
                            DEL
                        </Button>
                    </Box>
                    <Typography sx={{ mt: 1.2, ml: 0.5 }} variant="body2">  Codes: {diagnosisCodes.map(c => ` ${c} / `)}</Typography>

                    <Box>

                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default EntryForm;