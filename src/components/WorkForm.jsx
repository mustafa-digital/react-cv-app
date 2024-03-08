import { ErrorMessage } from "./ErrorMessage";

export function WorkForm({ index,
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
                           handleFormChange,
                           handlePageChange,
                           review=false
}) {

    const w = work.get(index);
    const jobTitle = w.title;
    const compName = w.company;
    const compLocation = w.location;
    const jobDesc = w.description;
    const jobStart = w.start;
    const jobEnd = w.end;

    const WORK_PAGE = 3;

    return (
        <>
            <button className='close-button' 
                    type='button' 
                    onClick={handleClose}>
                    &times;
            </button>

            <form id='work-form'
                  className="section-border"  
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
                            disabled={review} 
                            required />
                </label>
                <label> Company Name
                    {!compName.isValid && <ErrorMessage message={compName.message}/>}
                    <input type='text'
                           name='company-name'
                           placeholder='' 
                           defaultValue={compName.value}
                           onChange={handleCompanyNameChange}
                           disabled={review} 
                           required />
                </label>

                <label> Location
                    {!compLocation.isValid && <ErrorMessage message={compLocation.message}/>}
                    <input type='text'
                           name='company-location'
                           placeholder=''
                           defaultValue={compLocation.value}
                           onChange={handleCompanyLocationChange}
                           disabled={review}  
                           required />
                </label>

                <label> Job Description
                    {!jobDesc.isValid && <ErrorMessage message={jobDesc.message}/>}
                    <textarea className="job-desc-txtarea"
                              cols='20'
                              rows='15'
                              wrap='hard' 
                              defaultValue={jobDesc.value}
                              onChange={handleWorkDescriptionChange}
                              disabled={review} />
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
                            disabled={review} 
                            required />
                    <span> to </span>
                    <input type='date'
                            name='date-work-end'
                            placeholder=''
                            defaultValue={jobEnd.value}
                            onChange={handleWorkEndChange}
                            disabled={review}
                            className={jobEnd.value ? '' : 'empty-date'} />
                    </div>
                </div>
                {review ? <button type='button' onClick={() => handlePageChange(WORK_PAGE)} className='edit-button'>Change</button> 
                : 
                <button type='submit' className='save-button'>Save</button> }
            </form>  
        </>
    )
}