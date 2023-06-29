import { Typography, Box, Button, Paper, InputBase, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet, Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

interface PropNav {
    patientFilter: String,
    setPatientFilter: React.Dispatch<React.SetStateAction<string>>
}


const NavBar = ({ patientFilter, setPatientFilter }: PropNav) => {
    return (
        <>
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
            <Outlet />
        </>
    );
}

export default NavBar;