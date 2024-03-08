import { AddSection } from "./AddSection";
import { getEduForms } from "../utils/EducationUtils";

export function Education(props) {
    // generate educationforms and place them in eduforms array
    let eduForms = getEduForms(props);
    return (
        <section className={!props.review ? 'content' : ''}>
            {!props.review && <h1>Education</h1>}
            {(props.education.size > 0) &&
                <div style={{position: 'relative'}}>              
                    {eduForms.map((form, index) => { 
                        return <div key={index}>{form} </div>
                    })}
                </div>
            }
            {!props.review && <AddSection sectionName='Education' handleClick={props.handleAddEducationClick} />}
        </section>
    )
}
