import React from "react";
import { Diagnosis, Entry } from "../../utils/types";
import HealthCheck from "./EntryType/HealthCheck";
import Hospital from "./EntryType/Hospital";
import OccupationHealthcare from "./EntryType/OccupationHealthcare";

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
