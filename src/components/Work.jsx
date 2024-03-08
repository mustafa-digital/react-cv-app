import { AddSection } from "./AddSection";
import { getWorkForms } from "../utils/WorkUtils";

export function Work(props) {


    // generate workForms and place them in workforms array
    let workForms = getWorkForms(props); 
    return (
        <section className="content">
            <h1>Work Experience</h1>
            {/* render the WorkForms */}
            <div style={{position:'relative'}}>              
                {workForms.map((form, index) => { 
                    return <div key={index}>{form} </div>
                })}
            </div>
            <AddSection sectionName='Work Experience' handleClick={props.handleAddWorkClick} />
        </section>
    )
}