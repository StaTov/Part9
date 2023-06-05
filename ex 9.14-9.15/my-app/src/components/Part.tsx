import { CoursePart } from "../types";


const Part = (props: { part: CoursePart }) => {
    switch (props.part.kind) {
        case 'basic':
            return (
                <div>
                    <p><strong>{props.part.name}{props.part.exerciseCount}</strong></p>
                    <p><em>{props.part.description}</em></p>
                </div>
            )
        case 'group':
            return (
                <div>
                    <p><strong>{props.part.name}{props.part.exerciseCount}</strong></p>
                    <p>project exercises {props.part.groupProjectCount}</p>
                </div>
            )
        case 'background':
            return (
                <div>
                    <p><strong>{props.part.name}{props.part.exerciseCount}</strong></p>
                    <p><em>{props.part.description}</em></p>
                    <div>submit to <a href={props.part.backgroundMaterial}>{props.part.backgroundMaterial}</a></div>
                </div>
            )
        default:
            return null
    }
}

export default Part;