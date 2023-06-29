
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { setColorIcon } from '../../../utils/helper';
import { Diagnosis, HealthCheckEntry } from "../../../utils/types";
import DiagnosisCode from './DiagnosisCode';

interface PropsHealthCheck {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: PropsHealthCheck) => {

    const color = setColorIcon(entry.healthCheckRating)

    return (
        <Box sx={{ mb: 3, mt: 3 }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="body1">date: <strong>{entry.date}</strong></Typography>
                <Tooltip title='Health Check'>
                    <FavoriteIcon sx={{ color: { color }, ml: 3 }} />
                </Tooltip>
            </Box>
            <br />
            <Typography variant="body1">description: <em>{entry.description}</em></Typography>
            <br />
            {entry.diagnosisCodes &&
                <>
                    <Typography variant="body1">diagnoses: </Typography>
                    <DiagnosisCode diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
                </>
            }
            <br />
            <Typography variant="body1">diagnose by: {entry.specialist}</Typography>
            <Divider sx={{ pt: 1, pb: 1 }} />
        </Box>
    )
}
export default HealthCheck;