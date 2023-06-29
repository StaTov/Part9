
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Diagnosis } from "../../../utils/types";

interface PropsDiagnosisCodes {
    diagnosisCodes: Array<Diagnosis['code']>;
    diagnoses: Diagnosis[];
}
const DiagnosisCode = ({ diagnosisCodes, diagnoses }: PropsDiagnosisCodes) => {
    return (
        <>
            {diagnosisCodes.map(code => {
                const diagObj = diagnoses.find(d => d.code === code);
                if (diagObj) {
                    return (
                        <ListItemButton key={code}>
                            <ListItemText secondary={`${diagObj.code} ${diagObj.name}`} />
                        </ListItemButton>
                    )
                } else {
                    return null
                }
            })}
        </>
    )
}

export default DiagnosisCode;