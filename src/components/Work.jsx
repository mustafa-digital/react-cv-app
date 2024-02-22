import { AddSection } from "./AddSection"

export function Work({ workCount,
                       handleAddWorkClick,
                       handleSubmit }) {

    // Creates WorkForm components based on workCount number, and pushes them unto workForms array
    function getWorkForms() {
        let workForms = [];

        for (let i = 0; i < workCount; i++) {
            workForms.push( <WorkForm index={i.toString()}
                                        handleSubmit={handleSubmit} /> 
                        );}

        return workForms;
    }

    // generate workForms and place them in workforms array
    let workForms = getWorkForms(); 
    return (
        <section>
            <h1>Work Experience</h1>
            {/* render the educationForms */}
            <div>              
                {workForms.map((form, index) => { 
                        return <div key={index}>{form} </div>
                })}
            </div>
            <AddSection sectionName='Work Experience' handleClick={handleAddWorkClick} />
        </section>
    )
}

function WorkForm({ index,
                    handleSubmit}) {
    return (
        <>
            <form id='work-form' onSubmit={handleSubmit} data-index={index}>
                <label> Position Title
                    <input  type='text'
                            name='position-title'
                            placeholder='' 
                            required />
                </label>
                <label> Company Name
                    <input type='text'
                            name='company-name'
                            placeholder='' 
                            required />
                </label>

                <label> Location
                    <input type='text'
                            name='company-location'
                            placeholder='' />
                </label>

                <label> Job Description
                    <textarea className="job-desc-txtarea"
                              cols='20'
                              rows='15'
                              wrap='hard' />
                </label>

                {/* work duration input */}
                <div>
                    <label htmlFor="date-work-start" className='date-study-lbl'>Job Duration</label>
                    <div className="date-inputs-wrapper">
                        <input type='date'
                                    name='date-work-start'
                                    id='date-work-start'
                                    placeholder=''
                                    // value={}
                                    // onChange={handleStudyStartChange}
                                    />
                        <span> to </span>
                        <input type='date'
                                    name='date-work-end'
                                    placeholder=''
                                    // value={education.get(index).end}
                                    // onChange={handleStudyEndChange} 
                                    />
                    </div>
                </div>
                
            </form>  
        </>
    )
}