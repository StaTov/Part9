import { CoursePart } from "../types"

const Total = (props: { courseParts: CoursePart[] }) => {
    return (
        <p>
            Number of exercises{" "}
            {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
            }
        </p>
    )
}
export default Total