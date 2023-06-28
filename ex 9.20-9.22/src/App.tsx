import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography, Paper, InputBase, IconButton } from '@mui/material';
import { Diagnosis, Patient } from "./types";
import diagnosesService from "./services/diagnoses"
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/OnePatientInfo";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/system/Box";
import { grey } from '@mui/material/colors';



const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [patientFilter, setPatientFilter] = useState<string>('')

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

  const filteredPatients = !patientFilter
    ? patients
    : patients.filter(p => p.name.toLowerCase().includes(patientFilter.toLowerCase()))

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ mb: "0.1em", mt: '0.4em' }}>
            Patientor
          </Typography>
          <Box sx={{ borderRadius: 1, height: 60, backgroundColor: grey[700], pl: 1.7, pr: 1.7, mb: 6, display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', minWidth: '90px', maxWidth: '200px' }}
            >
              <InputBase
                value={patientFilter}
                onChange={(e) => setPatientFilter(e.target.value)}
                size="small"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Patients"
                inputProps={{ 'aria-label': 'search patients' }}
              />
              <SearchIcon color="disabled" sx={{ p: '5px' }} aria-label="search" />
            </Paper>
          </Box>
          <Divider hidden />
          <Routes>
            <Route path="/" element={
              <PatientListPage
                patients={filteredPatients}
                setPatients={setPatients} />} />
            <Route path="/:id" element={
              <PatientInfo
                diagnoses={diagnoses} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
