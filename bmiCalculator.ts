
type Answer = 'Normal (healthy weight) / Норма' | 'Overweight / Избыточный вес' | 'Underweight / Недостаточный вес'

interface BmiValues {
    valueHeight: number;
    valueWeight: number;
}
const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length > 4) throw new Error('Too many arguments')
    if (args.length < 4) throw new Error('Not enough arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            valueHeight: Number(args[2]),
            valueWeight: Number(args[3]),
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, weight: number): Answer => {

    if (height < 50) throw new Error('Height must be over 50')
    if (weight < 10) throw new Error('Weight must be over 10')

    const heightToMeter = height / 100
    const points = weight / heightToMeter ** 2

    switch (true) {
        case (points <= 18.4):
            return 'Underweight / Недостаточный вес';
        case (18.5 <= points && points <= 24.9):
            return 'Normal (healthy weight) / Норма';
        case (points >= 25):
            return 'Overweight / Избыточный вес';
    }
}

try {
    const { valueHeight, valueWeight } = parseArguments(process.argv)
    console.log(calculateBmi(valueHeight, valueWeight))
}
catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}