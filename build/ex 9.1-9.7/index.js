"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bmiCalculator_1 = __importDefault(require("./bmiCalculator"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    try {
        if (!req.query.height || !req.query.weight)
            throw new Error('missing parameters');
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight))
            throw new Error('malformatted parameters');
        const bmi = (0, bmiCalculator_1.default)(height, weight);
        res.json({ height, weight, bmi });
    }
    catch (error) {
        let errorMessage = 'Somthing wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
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
        const arr = daily_exercises.map(d => { return Number(d); });
        arr.forEach(a => {
            if (isNaN(a)) {
                throw new Error('malformatted parameters');
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = (0, utils_1.calculateExercises)(Number(target), arr);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.json(result);
    }
    catch (error) {
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
