import { useState } from "react";
import { DiaryFormType, Event, NewEntries } from "../types";
import diaryService from '../services/diaryService';
import axios from "axios";

const DiaryForm = ({ diaryEntries, setNote, setDiaryEntries }: DiaryFormType) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmite = async (e: Event) => {
        e.preventDefault()

        const newEntries: NewEntries = {
            date,
            visibility,
            weather,
            comment,
        } as NewEntries

        try {
            const addedDiary = await diaryService.create(newEntries)
            setDiaryEntries([...diaryEntries].concat(addedDiary))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status)
                console.error(error.response);
                if (error.response) { setNote(error.response.data) }
            } else {
                console.log(error)
            }
        } finally {
            setDate('')
            setComment('')
            setWeather('')
            setVisibility('')
        }
    }
    return (
        <form onSubmit={handleSubmite}>
            <h3>add new diary</h3>
            <div>data{" "}
                <input type='date' value={date} onChange={(e) => { setDate(e.target.value) }} />
            </div>
            <div>visibility :{" "}

                <label>
                    Great
                    <input
                        type='radio'
                        name='visibiluty'
                        value='great'
                        checked={visibility === 'great'}
                        onChange={(e) => setVisibility(e.target.value)}
                    />
                </label>
                <label>
                    Good
                    <input
                        type='radio'
                        name='visibiluty'
                        value='good'
                        checked={visibility === 'good'}
                        onChange={(e) => setVisibility(e.target.value)}
                    />
                </label>
                <label>
                    Ok
                    <input
                        type='radio'
                        name='visibiluty'
                        value='ok'
                        checked={visibility === 'ok'}
                        onChange={(e) => setVisibility(e.target.value)}
                    />
                </label>
                <label>
                    Poor
                    <input
                        type='radio'
                        name='visibiluty'
                        value='poor'
                        checked={visibility === 'poor'}
                        onChange={(e) => setVisibility(e.target.value)}
                    />
                </label>

            </div>
            <div>weather : {" "}
                <label>
                    Sunny
                    <input
                        type='radio'
                        name='weather'
                        value='sunny'
                        checked={weather === 'sunny'}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </label>
                <label>
                    Rainy
                    <input
                        type='radio'
                        name='weather'
                        value='rainy'
                        checked={weather === 'rainy'}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </label>
                <label>
                    Cloudy
                    <input
                        type='radio'
                        name='weather'
                        value='cloudy'
                        checked={weather === 'cloudy'}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </label>
                <label>
                    Stormy
                    <input
                        type='radio'
                        name='weather'
                        value='stormy'
                        checked={weather === 'stormy'}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </label>
                <label>
                    Windy
                    <input
                        type='radio'
                        name='weather'
                        value='windy'
                        checked={weather === 'windy'}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </label>
            </div>
            <div>comment{" "}
                <input value={comment} onChange={(e) => { setComment(e.target.value) }} />
            </div>
            <div>
                <button type="submit" >create</button>
            </div>


        </form>
    )
}

export default DiaryForm;