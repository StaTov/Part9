import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './utils';


const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        if (!req.query.height || !req.query.weight) throw new Error('missing parameters');

        const height = Number(req.query.height);
        const weight = Number(req.query.weight);

        if (isNaN(height) || isNaN(weight)) throw new Error('malformatted parameters');

        const bmi = calculateBmi(height, weight);
        res.json({ height, weight, bmi });
    } catch (error) {
        let errorMessage = 'Somthing wrong: ';
        if (error instanceof Error) { errorMessage += error.message; }
        res.status(400).send({ error: errorMessage });
    }
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        if (!target || !daily_exercises) {
            throw new Error('parameters missing');
        }
        if (isNaN(Number(target)) || !(daily_exercises instanceof Array)) {
            throw new Error('malformatted parameters');
        }

        const arr: Array<number> = daily_exercises.map(d => { return Number(d); });
        arr.forEach(a => {
            if (isNaN(a)) {
                throw new Error('malformatted parameters');
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(Number(target), arr);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.json(result);
    } catch (error) {
        let errorMessage = 'Somthing wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).send({ error: errorMessage });
    }


});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});