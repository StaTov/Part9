import patientsData from "../../data/patients";
import { noSnnPatients, Patient, newPatient, Entry, NoIdEntry } from "../types";
import { v1 as uuid } from 'uuid';



let patients = patientsData as Patient[];

const getPatients = (): noSnnPatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const getById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) throw new Error('Patient not found');
  return patient;
};

const addEntryById = (id: string, entry: NoIdEntry): Entry => {
  const entryWithId: Entry = {
    id: uuid(),
    ...entry
  };
  patients = patients.map(p => p.id === id ? {...p, entries: p.entries.concat(entryWithId)} : p);
  return entryWithId;
};

const addPatient = (newPatients: newPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...newPatients
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, getById, addEntryById };

