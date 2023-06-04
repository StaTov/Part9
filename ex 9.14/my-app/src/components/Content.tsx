
import { CourseParts } from "../types"

const Content = (props: CourseParts) => {
console.log('props', props.courseParts)
    return(
    <>
{props.courseParts.map(el => <p key={el.name}>{el.name}{el.exerciseCount}</p>)}
    </>
    )
}

export default Content