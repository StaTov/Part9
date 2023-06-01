import express from 'express';
import calculateBmi from './bmiCalculator';



const app = express()

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!')
})


app.get('/bmi', (req, res) => {
    try {
        if (!req.query.height || !req.query.weight) throw new Error('missing parameters')

        const height: number = Number(req.query.height)
        const weight: number = Number(req.query.weight)

        if (isNaN(height) || isNaN(weight)) throw new Error('malformatted parameters')

        const bmi: string = calculateBmi(height, weight)
        res.json({ height, weight, bmi })
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})