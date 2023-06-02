"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const calculateBmi = (height, weight) => {
    if (height < 50)
        throw new Error('Height must be over 50');
    if (weight < 10)
        throw new Error('Weight must be over 10');
    const heightToMeter = height / 100;
    const points = weight / Math.pow(heightToMeter, 2);
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
    const { valueHeight, valueWeight } = (0, utils_1.parseBmiArguments)(process.argv);
    console.log(calculateBmi(valueHeight, valueWeight));
}
catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
exports.default = calculateBmi;
