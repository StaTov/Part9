import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { brown, red, yellow, green } from '@mui/material/colors';
import MenuItem from "@mui/material/MenuItem";
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { BaseEntryNoId, Diagnosis, EntryNoId, HealthCheckRating, Patient, SickLeave, Type } from "../../types";
import patientService from '../../services/patients'
import axios from 'axios';
import ErrorNote from '../Note/ErrorNote';

interface PropsEntryForm {
    setInfoMessage: React.Dispatch<React.SetStateAction<string | null>>;
    setUser: React.Dispatch<React.SetStateAction<Patient | null>>;
    user: Patient;
    diagnoses: Diagnosis[];
    handleShowForm: () => void;
}

const EntryForm = ({ setInfoMessage, setUser, user, diagnoses, handleShowForm }: PropsEntryForm) => {

    const codeNames = diagnoses.map(d => d.code)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [code, setCode] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const [type, setType] = useState<Type>(Type.HealthCheck)
    const [dischargeDate, setDischargeDate] = useState('')
    const [criteria, setCriteria] = useState('')
    const [employerName, setEmployerName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dayCount, setDayCount] = useState<number | undefined>()
    const [sickLeave, setSickLeave] = useState<SickLeave | undefined>()
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.LowRisk)

    const handleAddCode = () => {
        if (!code) {
            setErrorMessage('missing code')
            return
        }
        if (diagnosisCodes.includes(code)) {
            setErrorMessage(`${code} alrady exist`)
            return
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
                setErrorMessage('Error handleType func')
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
                setErrorMessage('Error handleHealthCheckRating func')
                return
        }
    }

    const handleSickLeave = () => {
        if (!startDate && !endDate) {
            setErrorMessage(`missing data startDate or endDate`)
            return
        }
        const msDate = Date.parse(endDate) - Date.parse(startDate)
        if (isNaN(msDate)) {
            setErrorMessage(`missing data startDate or endDate`)
            return
        }
        const sickLeaveObj = { startDate, endDate }
        setSickLeave(sickLeaveObj)
        setDayCount(msDate / 86400000)
    }
    const handleResetSickLeave = () => {
        setStartDate('')
        setEndDate('')
        setSickLeave(undefined)
    }
    const handleSubmitEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const baseEntryNoId: BaseEntryNoId = { date, description, specialist }
        baseEntryNoId.diagnosisCodes = diagnosisCodes.length > 0
            ? diagnosisCodes
            : [];

        let entryNoId: EntryNoId;

        switch (type) {
            case 'Hospital':
                entryNoId = { ...baseEntryNoId, type, discharge: { date: dischargeDate, criteria } }
                break;
            case 'OccupationalHealthcare':
                entryNoId = { ...baseEntryNoId, type, employerName }
                if (sickLeave) entryNoId.sickLeave = sickLeave
                break;
            case 'HealthCheck':
                entryNoId = { ...baseEntryNoId, type, healthCheckRating }
                break;
            default:
                console.log('Error handleSubmitEntry')
                return null
        }
        try {
            const addedEntry = await patientService.createEntry(user.id, entryNoId)
            setUser({ ...user, entries: [...user.entries, addedEntry] })
            setInfoMessage('new entry added successfuly')
            handleShowForm()
        } catch (e) {

            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setErrorMessage(message);
                } else {
                    setErrorMessage("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setErrorMessage("Unknown error");
            }
        }
    }
    return (
        <Box>
            <Paper sx={{ p: 3, mt: 2.5 }} elevation={3}>
                <form onSubmit={handleSubmitEntry}>
                    <Typography sx={{ mb: 1 }} variant="h6"><strong>ENTRY FORM</strong></Typography>

                    <Box sx={{ mt: 0.4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Typography variant='h6' >Date and Type</Typography>
                        <TextField
                            size="small"
                            sx={{ mt: 1.2, alignSelf: 'flex-start' }}
                            helperText="please enter date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                        />
                        <TextField
                            helperText='please select type'
                            size="small"
                            sx={{ alignSelf: 'flex-start' }}
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
                        {type === 'OccupationalHealthcare' &&
                            <Box >
                                <Typography variant='h6'>Employer name</Typography>
                                <TextField
                                    sx={{ mt: 1.2 }}
                                    size="small"
                                    label="employer name"
                                    value={employerName}
                                    onChange={(e) => setEmployerName(e.target.value)}
                                />
                                <Box sx={{ mt: 1.2 }}>
                                    <Typography variant='h6'>Sick leave</Typography>
                                    <Box sx={{ mt: 1.2 }}>
                                        <TextField
                                            sx={{ mr: 1.2 }}
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            type='date'
                                            helperText="start date"
                                            size='small'
                                        />
                                        <TextField
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            type='date'
                                            helperText="end date"
                                            size='small'
                                        />
                                    </Box>
                                    <Box sx={{ mt: 1.2, display: 'flex', alignItems: 'center' }}>
                                        <Button
                                            sx={{ mr: 1.2 }}
                                            variant='outlined'
                                            onClick={handleSickLeave}
                                            size='small'
                                        >ASSIGN
                                        </Button>
                                        <Button
                                            color="error"
                                            disabled={!sickLeave}
                                            sx={{ mr: 1.2 }}
                                            variant='outlined'
                                            onClick={handleResetSickLeave}
                                            size='small'>
                                            RESET
                                        </Button>
                                        {sickLeave && <Typography variant='body1'> duration: {dayCount} day(s)</Typography>}
                                    </Box>
                                </Box>
                            </Box>
                        }
                        {type === 'Hospital' &&
                            <Box>
                                <Typography variant='h6'>Discharge</Typography>
                                <TextField
                                    sx={{ mt: 1.2 }}
                                    size="small"
                                    type="date"
                                    helperText="please enter discharge date"
                                    value={dischargeDate}
                                    onChange={(e) => setDischargeDate(e.target.value)}
                                />   <TextField
                                    sx={{ width: '100%', mt: 1.2 }}
                                    size="small"
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
                        <Typography sx={{ mt: 1.2 }} variant='h6'>Description</Typography>
                        <TextField
                            sx={{ mt: 1.2 }}
                            size="small"
                            multiline
                            label="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Typography sx={{ mt: 1.2 }} variant='h6'>Specialist</Typography>
                        <Box>
                            <TextField
                                sx={{ mt: 1.2 }}
                                size="small"
                                label="specialist"
                                value={specialist}
                                onChange={(e) => setSpecialist(e.target.value)}
                            />
                        </Box>
                        <Typography sx={{ mt: 1.2 }} variant='h6'>Diagnosis code</Typography>
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
                    </Box>
                    <ErrorNote errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" type="submit">SUBMIT</Button>
                        <Button variant="contained" color="error" type="button" onClick={handleShowForm}>CLOSE</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}

export default EntryForm;