import patientsData from "../../data/patients";
import { noSnnPatients, Patient, newPatient } from "../types";
import { v1 as uuid } from 'uuid';


const patients = patientsData;

const getPatients = (): noSnnPatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const findById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (patient) return patient;
  throw new Error('Patient not found');
};

const addPatient = (newPatients: newPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...newPatients
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, findById };

