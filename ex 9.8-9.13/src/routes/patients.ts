import express from 'express';
import patientsService from '../services/patients';
import { parseString, toEntries, toNewPatient, toPatientId } from '../utils';



const router = express.Router();

router.get('/', (_req, res) => {
    try {
        res.json(patientsService.getPatients());
    } catch (error: unknown) {
        let errorMessage = 'Somthing went wrong: ';
        if (error instanceof Error) {
            errorMessage += 'Error' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    const id = toPatientId(req.params.id);
    res.json(patientsService.getById(id));
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Somthing went wrong: ';
        if (error instanceof Error) {
            errorMessage += 'Error' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/entry/:id', (req, res) => {
    try {
        const id = parseString(req.params.id);

        const newEntry = toEntries(req.body);

        const addedEntry = patientsService.addEntryById(id, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Somthing went wrong. ';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;