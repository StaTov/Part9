export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}
export interface DiaryEntries {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}
export interface NoteType {
    note: null | string,
    setNote: React.Dispatch<React.SetStateAction<NoteValue>>
}
export interface DiaryFormType {
    setNote: React.Dispatch<React.SetStateAction<NoteValue>>,
    diaryEntries: DiaryEntries[],
    setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntries[]>>
}
export interface ContentType {
    diaryEntries: DiaryEntries[]
}
export type NewEntries = Omit<DiaryEntries, 'id'>
export type NoteValue = string | null;
export type Event =  React.SyntheticEvent;