import { Gender, newPatient, HospitalEntry, Discharge, Diagnosis, OccupationalHealthcareEntry, SickLeave, HealthCheckRating, HealthCheckEntry, Entry } from "./types";


const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect name ' + name);
    }
    return name;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect snn: ' + ssn);
    }
    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect gender: ' + occupation);
    }
    return occupation;
};

export const toPatientId = (id: unknown): string => {
    if (isString(id)) return id;
    throw new Error('Invalid param.id');
};
/*
const parseEntries = (entries: unknown): Entry[] => {
return entries
}
*/
const parseId = (id: unknown): string => {
    if (!isString(id)) {
        throw new Error('Incorrect id: ' + id);
    }
    return id;
};
const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    } return date;
};
const parseTypeHospital = (type: unknown): 'Hospital' => {
    if (!isString(type) && type !== 'Hospital') {
        throw new Error('Incorrect type: ' + type);
    }
    return 'Hospital';
};
const parseTypeHealthCheckRating = (type: unknown): 'HealthCheck' => {
    if (!isString(type) && type !== 'HealthCheck') {
        throw new Error('Incorrect type: ' + type);
    }
    return 'HealthCheck';
};
const parseTypeOccupationalHealthcareEntry = (type: unknown): 'OccupationalHealthcare' => {
    if (!isString(type) && type !== 'OccupationalHealthcare') {
        throw new Error('Incorrect type: ' + type);
    }
    return 'OccupationalHealthcare';
};
const parseString = (str: unknown): string => {
    if (!isString(str)) {
        throw new Error('Incorrect data, data not a string type: ' + str);
    }
    return str;
};
const isDischarge = (obj: unknown): obj is Discharge => {
    if (obj && typeof obj === 'object') {
        if ('date' in obj && 'criteria' in obj) {
            if (isString(obj.date) && isDate(obj.date) && isString(obj.criteria)) return true;
        }
    }
    return false;
};
const parseDischarge = (obj: unknown): Discharge => {
    if (!isDischarge(obj)) {
        throw new Error('Incorrect discharge: ' + obj);
    }
    return obj;
};
const isSickLeave = (obj: unknown): obj is SickLeave => {
    if (obj && typeof obj === 'object') {
        if ('startDate' in obj && 'endDate' in obj) {
            if (isString(obj.startDate) && (isString(obj.endDate))) {
                return true;
            }
        }
    } return false;
};
const parseSickLeave = (obj: unknown): SickLeave => {
    if (!isSickLeave(obj)) {
        throw new Error('Incorrect sickLeave: ' + obj);
    }
    return obj;
};
const parseDiagnosisCodes = (arr: unknown): Array<Diagnosis['code']> => {
    if (!arr || !Array.isArray(arr)) {
        throw new Error('Incorrect or missing data');
    }
    arr.forEach(a => { if (!isString(a)) { throw new Error('Incorrect data: ' + a); } });
    return arr as Array<Diagnosis['code']>;
};
const isNumber = (text: unknown): text is number => {
    return typeof text === 'number';
};
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => Number(v)).includes(param);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect data: ' + rating);
    } return rating;
};


export const toOccupationalHealthcareEntry = (obj: unknown): OccupationalHealthcareEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('id' in obj && 'date' in obj && 'type' in obj && 'employerName' in obj && 'specialist' in obj && 'description' in obj) {
        let newObj: OccupationalHealthcareEntry = {
            id: parseId(obj.id),
            date: parseDate(obj.date),
            description: parseString(obj.description),
            specialist: parseString(obj.specialist),
            type: parseTypeOccupationalHealthcareEntry(obj.type),
            employerName: parseString(obj.employerName),
        };
        if ('diagnosisCodes' in obj) {
            newObj = {
                ...newObj,
                diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
            };
        }
        if ('sickLeave' in obj) {
            newObj = {
                ...newObj,
                sickLeave: parseSickLeave(obj.sickLeave)
            };
        } return newObj;
    } throw new Error('Incorrect or missing data');
};
export const toHealthCheckEntry = (obj: unknown): HealthCheckEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('id' in obj && 'date' in obj && 'type' in obj && 'healthCheckRating' in obj && 'specialist' in obj && 'description' in obj) {
        let newObj: HealthCheckEntry = {
            id: parseId(obj.id),
            date: parseDate(obj.date),
            type: parseTypeHealthCheckRating(obj.type),
            description: parseString(obj.description),
            specialist: parseString(obj.specialist),
            healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
        };
        if ('diagnosisCodes' in obj) {
            newObj = {
                ...newObj,
                diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
            };
        } return newObj;
    } throw new Error("Incorrect or missin data");
};
export const toHospital = (obj: unknown): HospitalEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('id' in obj && 'date' in obj && 'type' in obj && 'discharge' in obj && 'specialist' in obj && 'description' in obj) {
        const newObj: HospitalEntry = {
            id: parseId(obj.id),
            date: parseDate(obj.date),
            type: parseTypeHospital(obj.type),
            description: parseString(obj.description),
            specialist: parseString(obj.specialist),
            discharge: parseDischarge(obj.discharge)
        };
        if ('diagnosisCodes' in obj) {
            const updateObj = {
                ...newObj,
                diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
            };
            return updateObj;
        } return newObj;
    } throw new Error('Invalid hospitalEntry');
};

const toEntries = (object: unknown): Entry => {
   if(object && typeof object === 'object'){
  if( 'type' in object){
   switch (object.type) {
        case 'Hospital':
            return toHospital(object);
        case 'HealthCheck':
            return toHealthCheckEntry(object);
        case 'OccupationalHealthcare':
            return toOccupationalHealthcareEntry(object);
            default:
                throw new Error('Incorrect data');
    }}
} throw new Error('Incorrect data:' +object);
};

export const toNewPatient = (object: unknown): newPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient: newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries.map(o => toEntries(o)),
        };
        return newPatient;
    }


    throw new Error('Incorrect or missing data');
};



