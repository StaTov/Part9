import axios from "axios"
import { apiBaseUrl } from "../utils/constants"
import { Diagnosis } from "../utils/types";


const getAll = async () => {
    const {data} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
    return data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };