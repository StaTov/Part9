import axios from 'axios';
import { DiaryEntries, NewEntries } from '../types';

const url = 'http://localhost:3001/api/diaries'

const getAll = async () => {
    const response = await axios.get<DiaryEntries[]>(url)
    return response.data
}
const create = async (obj: NewEntries) => {
    const response = await axios.post<DiaryEntries>(url, obj)
    return response.data
}
export default { getAll, create };