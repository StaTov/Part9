
import { CoursePart } from "../types"
import Part from "./Part"

const Content = (props: { courseParts: CoursePart[] }) => {
    console.log('props', props.courseParts)
    return (
        <>
            {props.courseParts.map(part => <Part key={part.name} part={part}/>)}
        </>
    )
}

export default Content