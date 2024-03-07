import { AddSection } from "./AddSection";
import { ErrorMessage } from "./ErrorMessage";

export function Education({ education,
                            handleSchoolNameChange,
                            handleDegreeSelectChange,
                            handleTitleStudyChange,
                            handleStudyStartChange,
                            handleStudyEndChange,
                            handleSubmit,
                            handleAddEducationClick,
                            formEditingHandler,
                            handleClose,
                            handleFormChange
                        }) {

    // Creates EducationForm components based on education size, and pushes them unto eduForms array
    function getEduForms() {
        let eduForms = [];

        for (let i = 0; i < education.size; i++) {
            eduForms.push( <EducationForm 
                                            index={i} 
                                            education={education}
                                            handleSchoolNameChange={handleSchoolNameChange}
                                            handleDegreeSelectChange={handleDegreeSelectChange}
                                            handleTitleStudyChange={handleTitleStudyChange}
                                            handleStudyStartChange={handleStudyStartChange}
                                            handleStudyEndChange={handleStudyEndChange} 
                                            handleSubmit={handleSubmit}
                                            formEditingHandler={formEditingHandler}
                                            handleFormChange={handleFormChange} 
                                            handleClose={handleClose} /> );
        }

        return eduForms;
    }

    // generate educationforms and place them in eduforms array
    let eduForms = getEduForms(); 
    return (
        <section className='edu-section'>
            <h1>Education</h1>
            {/* render the educationForms */}
            <div style={{position: 'relative'}}>              
                {eduForms.map((form, index) => { 
                        return <div key={index}>{form} </div>
                })}
            </div>
            <AddSection sectionName='Education' handleClick={handleAddEducationClick} />
        </section>
    )
}

function EducationForm({
                        index,
                        education,
                        handleSchoolNameChange,
                        handleDegreeSelectChange,
                        handleTitleStudyChange,
                        handleStudyStartChange,
                        handleStudyEndChange,
                        handleSubmit,
                        formEditingHandler,
                        handleClose,
                        handleFormChange 
                    }) {
    const edu = education.get(index);
    const schoolName = edu.name;
    const degree = edu.degree;
    const titleStudy = edu.title;
    const studyStart = edu.start;
    const studyEnd = edu.end;
    return (
        <>
            <button className='close-button' type='button' onClick={handleClose}>&times;</button>
            <form id='education-form' 
                onSubmit={handleSubmit} 
                onClick={formEditingHandler}
                onInput={handleFormChange}
                data-index={index}
                noValidate >
                {/* school name input  */}
                <label> College Name
                    {!schoolName.isValid && <ErrorMessage message={schoolName.message}/>}
                    <input type='text'
                            name='school-name'
                            placeholder=''
                            defaultValue={schoolName.value}
                            onChange={handleSchoolNameChange} 
                            required />
                </label>

                <div className='degree-wrapper'>
                    {/* degree type selection */}
                    <label> Degree
                        {!degree.isValid && <ErrorMessage message={degree.message}/>}
                        <select name='degree'
                                id='degree-select'
                                defaultValue={degree.value} 
                                onChange={handleDegreeSelectChange}
                                className={degree.value ? 'valid' : ''} 
                                required >
                
                            <option value=''>Choose your degree</option>
                            <option value='AA'>Associate of Arts</option>
                            <option value='AS'>Associate of Science</option>
                            <option value='AAS'>Associate of Applied Sciences</option>
                            <option value='AGS'>Associate of General Studies</option>
                            <option value='BSc'>Bachelor of Science</option>
                            <option value='BFA'>Bachelor of Fine Arts</option>
                            <option value='BEd'>Bachelor of Education</option>
                            <option value='BEng'>Bachelor of Engineering</option>
                            <option value='BCom'>Bachelor of Commerce</option>
                            <option value='MA'>Master of Arts</option>
                            <option value='MSc'>Master of Science</option>
                            <option value='MEd'>Master of Education</option>
                            <option value='Phd'>Doctor of Philosophy</option>
                            <option value='MD'>Doctor of Medicine</option>
                        </select>
                    </label>

                    {/* title of study input */}
                    <label> Title of Study
                        {!titleStudy.isValid && <ErrorMessage message={titleStudy.message}/>}
                        <input type='text'
                                    name='title-study'
                                    placeholder=''
                                    defaultValue={titleStudy.value}
                                    onChange={handleTitleStudyChange} 
                                    required />
                    </label>
                </div>

                {/* date of study input */}
                <div>
                    <label htmlFor="date-study-start" className='date-study-lbl'>Date of Study
                        {!studyStart.isValid && <ErrorMessage message={studyStart.message}/>}
                    </label>

                    <div className="date-inputs-wrapper">

                        <input type='date'
                                    name='date-study-start'
                                    id='date-study-start'
                                    placeholder=''
                                    defaultValue={studyStart.value}
                                    onChange={handleStudyStartChange} 
                                    required />
                        <span> to </span>
                        <input type='date'
                                    name='date-study-end'
                                    placeholder=''
                                    defaultValue={studyEnd.value}
                                    onChange={handleStudyEndChange} 
                                    className={studyEnd.value ? '' : 'empty-date'} />
                    </div>
                </div>
                <button type='submit' className='save-button'>Save</button>
            </form>
        </>
    )
}