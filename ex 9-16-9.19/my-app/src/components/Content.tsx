import { DiaryEntries } from "../types";

const Content = (props: { diaryEntries: DiaryEntries[] }) => {
    return (
        <div>
            {props.diaryEntries.map(diary =>
                <div key={diary.id}>
                    <hr />
                    <h4>  date: {diary.date}</h4>
                    <p>visibility: <strong>{diary.visibility}</strong></p>
                    <p>weather: <strong>{diary.weather}</strong></p>
                    <p>comment: <em>{diary.comment}</em></p>
                </div>
            )}
        </div>
    )
}

export default Content;