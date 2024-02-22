import { AddSection } from "./AddSection"

export function Work({ work,
                       workCount,
                       handleWorkTitleChange,
                       handleCompanyNameChange,
                       handleCompanyLocationChange,
                       handleWorkDescriptionChange,
                       handleWorkStartChange,
                       handleWorkEndChange,
                       handleAddWorkClick,
                       formEditingHandler,
                       handleSubmit }) {

    // Creates WorkForm components based on workCount number, and pushes them unto workForms array
    function getWorkForms() {
        let workForms = [];

        for (let i = 0; i < workCount; i++) {
            workForms.push( <WorkForm index={i.toString()}
                                      work={work}
                                      workCount={workCount}
                                      handleWorkTitleChange={handleWorkTitleChange}
                                      handleCompanyNameChange={handleCompanyNameChange}
                                      handleCompanyLocationChange={handleCompanyLocationChange}
                                      handleWorkDescriptionChange={handleWorkDescriptionChange}
                                      handleWorkStartChange={handleWorkStartChange}
                                      handleWorkEndChange={handleWorkEndChange}
                                      handleSubmit={handleSubmit}
                                      handleAddWorkClick={handleAddWorkClick} 
                                      formEditingHandler={formEditingHandler} /> 
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
                       work,
                       handleWorkTitleChange,
                       handleCompanyNameChange,
                       handleCompanyLocationChange,
                       handleWorkDescriptionChange,
                       handleWorkStartChange,
                       handleWorkEndChange,
                       formEditingHandler,
                       handleSubmit
                  }) {
    return (
        <>
            <form id='work-form' onSubmit={handleSubmit} onClick={formEditingHandler} data-index={index}>
                <label> Position Title
                    <input  type='text'
                            name='position-title'
                            placeholder=''
                            value={work.get(index).title}
                            onChange={handleWorkTitleChange} 
                            required />
                </label>
                <label> Company Name
                    <input type='text'
                            name='company-name'
                            placeholder='' 
                            value={work.get(index).company}
                            onChange={handleCompanyNameChange} 
                            required />
                </label>

                <label> Location
                    <input type='text'
                            name='company-location'
                            placeholder=''
                            value={work.get(index).location}
                            onChange={handleCompanyLocationChange}  />
                </label>

                <label> Job Description
                    <textarea className="job-desc-txtarea"
                              cols='20'
                              rows='15'
                              wrap='hard' 
                              value={work.get(index).description}
                              onChange={handleWorkDescriptionChange} />
                </label>

                {/* work duration input */}
                <div>
                    <label htmlFor="date-work-start" className='date-study-lbl'>Job Duration</label>
                    <div className="date-inputs-wrapper">
                        <input type='date'
                                    name='date-work-start'
                                    id='date-work-start'
                                    placeholder=''
                                    value={work.get(index).start}
                                    onChange={handleWorkStartChange} />
                        <span> to </span>
                        <input type='date'
                                    name='date-work-end'
                                    placeholder=''
                                    value={work.get(index).end}
                                    onChange={handleWorkEndChange}  />
                    </div>
                </div>   
            </form>  
        </>
    )
}