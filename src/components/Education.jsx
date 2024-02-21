export function Education({ 
                            schoolName,
                            degree,
                            titleStudy,
                            studyStart,
                            studyEnd,
                            handleSchoolNameChange,
                            handleDegreeSelectChange,
                            handleTitleStudyChange,
                            handleStudyStartChange,
                            handleStudyEndChange,
                            handleSubmit 
                        }) {

    
    // const [selectedDegree, setSelectedDegree] = useState('');
    return (
        <section>
            <h1>Education</h1>
            <form id='education-form' onSubmit={handleSubmit}>
                {/* school name input  */}
                <label> College Name
                    <input type='text'
                            name='school-name'
                            placeholder=''
                            value={schoolName}
                            onChange={handleSchoolNameChange} />
                </label>

                <div className='degree-wrapper'>
                    {/* degree type selection */}
                    <label> Degree
                        <select name='degree'
                                id='degree-select'
                                value={degree} 
                                onChange={handleDegreeSelectChange} >
                
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
                        <input type='text'
                                    name='title-study'
                                    placeholder=''
                                    value={titleStudy}
                                    onChange={handleTitleStudyChange} />
                    </label>
                </div>

                    {/* date of study input */}
                        <div className="date-study-wrapper">
                            <label htmlFor="date-study-start" className='date-study-lbl'>Date of Study</label>
                            <div className="date-inputs-wrapper">
                                <input type='date'
                                            name='date-study-start'
                                            id='date-study-start'
                                            placeholder=''
                                            value={studyStart}
                                            onChange={handleStudyStartChange} />
                                <span> to </span>
                                <input type='date'
                                            name='date-study-end'
                                            placeholder=''
                                            value={studyEnd}
                                            onChange={handleStudyEndChange} />
                            </div>
                        </div>

            </form>
        </section>
    )
}