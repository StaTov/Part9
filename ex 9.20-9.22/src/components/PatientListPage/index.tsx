import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import { PatientFormValues, Patient} from "../../utils/types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar/HealthRatingBar";
import patientService from "../../services/patients";
import { Link } from "react-router-dom";
import React from "react";
import NotFound from "./NotFound";
import {getRating} from '../../utils/helper';


interface Props {
  patientFilter: String,
  patients: Patient[],
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patientFilter, patients, setPatients }: Props) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

 

  return (
    <Box sx={{ mb: 4 }} className="App">
      <Box>
        <Typography sx={{ mb: 1.7 }} align="center" variant="h5">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link
                  to={`/api/patients/${patient.id}`}
                  style={{ textDecoration: 'none' }}>
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={getRating(patient.entries)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {patientFilter && <NotFound patients={patients} />}

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </Box>
  );
};

export default PatientListPage;
