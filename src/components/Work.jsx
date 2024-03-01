import { AddSection } from "./AddSection";
import { ErrorMessage } from "./ErrorMessage";

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
                       handleSubmit,
                       handleClose,
                       handleFormChange }) {

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
                                      formEditingHandler={formEditingHandler}
                                      handleClose={handleClose}
                                      handleFormChange={handleFormChange} /> 
                        );}

        return workForms;
    }

    // generate workForms and place them in workforms array
    let workForms = getWorkForms(); 
    return (
        <section>
            <h1>Work Experience</h1>
            {/* render the educationForms */}
            <div style={{position:'relative'}}>              
                {workForms.map((form, index) => { 
                        return <div key={index}>{form} </div>
                })}
            </div>
            <AddSection sectionName='Work Experience' handleClick={handleAddWorkClick} />
        </section>
    )
}

function WorkForm({    index,
                       work,
                       handleWorkTitleChange,
                       handleCompanyNameChange,
                       handleCompanyLocationChange,
                       handleWorkDescriptionChange,
                       handleWorkStartChange,
                       handleWorkEndChange,
                       formEditingHandler,
                       handleSubmit,
                       handleClose,
                       handleFormChange
                  }) {
    index = index.toString();
    const w = work.get(index);
    const jobTitle = w.title;
    const compName = w.company;
    const compLocation = w.location;
    const jobDesc = w.description;
    const jobStart = w.start;
    const jobEnd = w.end;

    return (
        <>
            <button className='close-button' 
                    type='button' 
                    onClick={handleClose}>
                &times;
            </button>

            <form id='work-form' 
                    onSubmit={handleSubmit} 
                    onClick={formEditingHandler}
                    onInput={handleFormChange} 
                    data-index={index}
                    noValidate >

                <label> Position Title
                    {!jobTitle.isValid && <ErrorMessage message={jobTitle.message}/>}
                    <input  type='text'
                            name='position-title'
                            placeholder=''
                            defaultValue={jobTitle.value}
                            onChange={handleWorkTitleChange} 
                            required />
                </label>
                <label> Company Name
                    {!compName.isValid && <ErrorMessage message={compName.message}/>}
                    <input type='text'
                            name='company-name'
                            placeholder='' 
                            defaultValue={compName.value}
                            onChange={handleCompanyNameChange} 
                            required />
                </label>

                <label> Location
                    {!compLocation.isValid && <ErrorMessage message={compLocation.message}/>}
                    <input type='text'
                            name='company-location'
                            placeholder=''
                            defaultValue={compLocation.value}
                            onChange={handleCompanyLocationChange}  
                            required />
                </label>

                <label> Job Description
                    {!jobDesc.isValid && <ErrorMessage message={jobDesc.message}/>}
                    <textarea className="job-desc-txtarea"
                              cols='20'
                              rows='15'
                              wrap='hard' 
                              defaultValue={jobDesc.value}
                              onChange={handleWorkDescriptionChange} />
                </label>

                {/* work duration input */}
                <div>
                    <label htmlFor="date-work-start" className='date-study-lbl'>Job Duration
                        {!jobStart.isValid && <ErrorMessage message={jobStart.message}/>}
                    </label>
                    <div className="date-inputs-wrapper">
                        <input type='date'
                                    name='date-work-start'
                                    id='date-work-start'
                                    placeholder=''
                                    defaultValue={jobStart.value}
                                    onChange={handleWorkStartChange} 
                                    required />
                        <span> to </span>
                        <input type='date'
                                    name='date-work-end'
                                    placeholder=''
                                    defaultValue={jobEnd.value}
                                    onChange={handleWorkEndChange}
                                    className='empty-date' />
                    </div>
                </div>
                <button type='submit' className='save-button'>Save</button>   
            </form>  
        </>
    )
}