//functions here
import { brown, green, yellow, red } from '@mui/material/colors';
import { Entry } from "./types";


// help to assign healthrating rating
export const getRating = (entries: Entry[]): number => {

    if (!entries || entries.length === 0) return 4;

    const toHealthCheckEntry = entries.filter(e => e.type === "HealthCheck");

    if (toHealthCheckEntry.length === 0) return 4;
    const entry = toHealthCheckEntry.at(-1)

    if (entry
      && typeof entry === 'object'
      && 'healthCheckRating' in entry
      && isNumber(entry.healthCheckRating)
    ) {
      return entry.healthCheckRating;
    }
    return 4;
  }

  //check variable is number
  const isNumber = (text: unknown): text is number => {
    return typeof text === 'number';
  };

  // set color icon heard <3
export const setColorIcon = (n: number): string => {
    switch (n) {
        case 0:
            return green['A700']
        case 1:
            return yellow['A700']
        case 2:
            return red['A700']
        case 3:
            return brown[900]
        default:
            throw new Error('Incorect data: ' + n)
    }
}