import { AddSection } from "./AddSection";
import { getEduForms } from "../utils/EducationUtils";

export function Education(props) {

    // generate educationforms and place them in eduforms array
    let eduForms = getEduForms(props); 
    return (
        <section className='content'>
            <h1>Education</h1>
            {/* render the educationForms */}
            <div style={{position: 'relative'}}>              
                {eduForms.map((form, index) => { 
                        return <div key={index}>{form} </div>
                })}
            </div>
            <AddSection sectionName='Education' handleClick={props.handleAddEducationClick} />
        </section>
    )
}
