import express from 'express';
import patientsService from '../services/patients';
import  {toNewPatient, toPatientId} from '../utils';



const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = toPatientId(req.params.id);
    res.json(patientsService.findById(id));
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);

});

export default router;