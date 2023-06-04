export interface CourseName {
    courseName: string;
}

interface CoursePart {
    name: string;
    exerciseCount: number;
}

export interface CourseParts {
    courseParts: CoursePart[]
}
