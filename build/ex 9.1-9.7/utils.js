"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCalculateArgyments = exports.calculateExercises = exports.parseBmiArguments = void 0;
const parseBmiArguments = (args) => {
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            valueHeight: Number(args[2]),
            valueWeight: Number(args[3]),
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
exports.parseBmiArguments = parseBmiArguments;
const calculateExercises = (target, arr) => {
    let rating;
    function setRating() {
        switch (true) {
            case (average <= target * 0.35):
                return rating = 1;
            case (average > target * 0.35 && average < target):
                return rating = 2;
            default:
                return rating = 3;
        }
    }
    function setRatingDescription(rating) {
        switch (rating) {
            case (1):
                return 'Very Bad';
            case (2):
                return 'not too bad but could be better';
            case (3):
                return 'very good';
            default:
                throw new Error('Somthing was wrong in rating switch case');
        }
    }
    const periodLength = arr.length;
    const trainingDays = arr.filter(d => d > 0).length;
    if (periodLength === 0 || trainingDays === 0)
        throw new Error(`You haven't trained yet`);
    const allTrainingTime = arr.reduce((allTime, time) => { return allTime + time; });
    const average = Math.trunc((allTrainingTime / arr.length) * 100) / 100;
    const success = target <= average;
    rating = setRating();
    const ratingDescription = setRatingDescription(rating);
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};
exports.calculateExercises = calculateExercises;
const parseCalculateArgyments = (arr) => {
    if (arr.length < 4)
        throw new Error('Not enough arguments');
    arr.forEach((arg, index) => {
        if (index <= 1)
            return;
        if (isNaN(Number(arg)))
            throw new Error('Provided values were not numbers!');
        if (Number(arg) < 0)
            throw new Error('Provided values ​​must be positive');
    });
    const target = Number(arr[2]);
    const arrNumber = arr.slice(3).map(a => Number(a));
    return {
        target,
        arrNumber
    };
};
exports.parseCalculateArgyments = parseCalculateArgyments;
