"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("./utils");
try {
    const { target, arrNumber } = (0, utils_1.parseCalculateArgyments)(process.argv);
    console.log((0, utils_2.calculateExercises)(target, arrNumber));
}
catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
