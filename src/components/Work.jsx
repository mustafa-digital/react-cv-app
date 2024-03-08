import { AddSection } from "./AddSection";
import { getWorkForms } from "../utils/WorkUtils";

export function Work(props) {


    // generate workForms and place them in workforms array
    let workForms = getWorkForms( {...props }); 
    return (
        <section>
            <h1>Work Experience</h1>
            {/* render the educationForms */}
            <div style={{position:'relative'}}>              
                {workForms.map((form, index) => { 
                    return <div key={index}>{form} </div>
                })}
            </div>
            <AddSection sectionName='Work Experience' handleClick={props.handleAddWorkClick} />
        </section>
    )
}