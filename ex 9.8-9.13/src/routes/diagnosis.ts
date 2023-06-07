import express from 'express';
import diagService from '../services/diagnosisService';

const router = express.Router();

router.get('/',(_req, res) => {
    res.send(diagService.getDiagnosis());
});

export default router;