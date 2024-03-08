import { AddSection } from "./AddSection";
import { getWorkForms } from "../utils/WorkUtils";

export function Work(props) {
    // generate workForms and place them in workforms array
    let workForms = getWorkForms(props); 
    return (
        <section className={!props.review ? 'content' : ''}>
            {!props.review && <h1>Work Experience</h1>}
            {(props.work.size > 0) && 
                <div style={{position:'relative'}}>              
                    {workForms.map((form, index) => { 
                        return <div key={index}>{form} </div>
                    })}
                </div>
            }
            {!props.review && <AddSection sectionName='Work Experience' handleClick={props.handleAddWorkClick} />}
        </section>
    )
}