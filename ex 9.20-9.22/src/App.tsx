import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from '@mui/material';
import { Diagnosis, Patient } from "./utils/types";
import diagnosesService from "./services/diagnoses"
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/OnePatientInfo";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import NavBar from "./components/NavBar/NavBar"


const App = () => {

  //state
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [patientFilter, setPatientFilter] = useState<string>('')

  //fetch data
  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll()
      setDiagnoses(diagnoses)
    }
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    void fetchDiagnosesList();
    void fetchPatientList();
  }, []);

  // filter release
  const filteredPatients = !patientFilter
    ? patients
    : patients.filter(p => p.name.toLowerCase().includes(patientFilter.toLowerCase()))

  return (
    <div className="App">
      <Container>
        <Routes>
          <Route
            path="/"
            element={<NavBar
              patientFilter={patientFilter}
              setPatientFilter={setPatientFilter} />}>
            <Route
              index
              element={<PatientListPage
                patientFilter={patientFilter}
                patients={filteredPatients}
                setPatients={setPatients} />}
            />
            <Route
              path="/api/patients/:id"
              element={
                <PatientInfo
                  diagnoses={diagnoses} />}
            />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Container>
    </div >
  );
};

export default App;
