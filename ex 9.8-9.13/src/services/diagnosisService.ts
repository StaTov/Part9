import diagnosis from "../../data/diagnosis";
import { Diagnosis } from "../types";


const getDiagnosis = (): Diagnosis[] => {
    return diagnosis;
};

export default {getDiagnosis};