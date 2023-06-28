import axios from "axios";
import { Entry, EntryNoId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

const getById = async (id: string) => {
  const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
  return patient;
}

const createEntry = async (id: string, object: EntryNoId) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/entry/${id}`, object)
  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getById, createEntry
};

