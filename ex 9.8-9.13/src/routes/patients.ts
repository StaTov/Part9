import express from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/',(_req, res) => {
    res.send(patientsService.getPatients());
});

router.post('/',(req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
   res.json(addedPatient);

});

export default router;