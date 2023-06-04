import patientsData from "../../data/patients";
import { noSnnPatients, Patients, newPatient } from "../../types";
import {v1 as uuid} from 'uuid';


const patients: Patients[] = patientsData;

const getPatients = (): noSnnPatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation ,
      }));
     
};

const addPatient = (newPatients: newPatient): Patients => {
const newPatient= {
  id: uuid(),
  ...newPatients
};
patients.push(newPatient);
return newPatient;
};

export default { getPatients, addPatient };

