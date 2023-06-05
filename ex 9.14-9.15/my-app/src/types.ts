export interface CourseName {
    courseName: string;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
export interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBase {
    description?: string;
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
    description?: string;
    backgroundMaterial: string;
    kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
