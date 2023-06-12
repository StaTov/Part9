import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
    const [type, SetType] = useState<Type | null>(null)
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
console.log('Type', Type)
    return (
        <Box>
            <form>
                <Typography variant="h6">entry form</Typography>
                <Box sx={{ mt: 0.4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <TextField
                        size="small"
                        sx={{ alignSelf: 'flex-start' }}
                        required
                        helperText="please enter date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                    />
                    <TextField
                        size="small"
                        required
                        multiline
                        label="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1.2 }}
                        size="small"
                        required
                        label="specialist"
                        value={specialist}
                        onChange={(e) => setSpecialist(e.target.value)}
                    />
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