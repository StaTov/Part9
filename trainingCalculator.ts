import { parseCalculateArgyments } from './utils'
import { calculateExercises } from './utils'

try {
    const { target, arrNumber } = parseCalculateArgyments(process.argv)
    console.log(calculateExercises(target, arrNumber))
} catch (error: unknown) {
    let errorMessage: string = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}