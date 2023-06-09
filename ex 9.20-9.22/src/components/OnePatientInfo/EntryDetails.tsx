import React from "react";
import { Diagnosis, Entry } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationHealthcare from "./OccupationHealthcare";

interface PropsEntry {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: PropsEntry) => {

    switch (entry.type) {
        case 'Hospital':
            return <Hospital diagnoses={diagnoses} entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationHealthcare diagnoses={diagnoses} entry={entry} />;
        case 'HealthCheck':
            return <HealthCheck diagnoses={diagnoses} entry={entry} />
        default:
            return null
    }
}

export default EntryDetails
