import { parseBmiArguments } from "./utils";

type Answer = 'Normal (healthy weight) / Норма' | 'Overweight / Избыточный вес' | 'Underweight / Недостаточный вес';



const calculateBmi = (height: number, weight: number): Answer => {

    if (height < 50) throw new Error('Height must be over 50');
    if (weight < 10) throw new Error('Weight must be over 10');

    const heightToMeter = height / 100;
    const points = weight / heightToMeter ** 2;

    switch (true) {
        case (points <= 18.4):
            return 'Underweight / Недостаточный вес';
        case (18.5 <= points && points <= 24.9):
            return 'Normal (healthy weight) / Норма';
        case (points >= 25):
            return 'Overweight / Избыточный вес';
        default:
            throw new Error('Something was wrong in switch case');
    }

};

try {
    const { valueHeight, valueWeight } = parseBmiArguments(process.argv);
   console.log(calculateBmi(valueHeight, valueWeight));
}
catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi;