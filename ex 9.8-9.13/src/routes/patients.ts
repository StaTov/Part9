import express from 'express';
import patientsService from '../services/patients';
import { parseString, toEntries, toNewPatient, toPatientId } from '../utils';



const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = toPatientId(req.params.id);
    res.json(patientsService.getById(id));
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);

});
router.post('/entry/:id', (req, res) => {
    const id = parseString(req.params.id);
    console.log('id', id);
    const newEntry = toEntries(req.body);
    console.log('newEntry', newEntry);
    const addedEntry = patientsService.addEntryById(id, newEntry);
    res.json(addedEntry);
});

export default router;