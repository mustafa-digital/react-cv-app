import { useState } from "react";
import { AddSection } from "./AddSection";

export function Education({ eduCount,
                            education,
                            handleSchoolNameChange,
                            handleDegreeSelectChange,
                            handleTitleStudyChange,
                            handleStudyStartChange,
                            handleStudyEndChange,
                            handleSubmit,
                            handleAddEducationClick,
                            formEditingHandler,
                            handleClose
                        }) {

    // Creates EducationForm components based on eduCount number, and pushes them unto eduForms array
    function getEduForms() {
        let eduForms = [];

        for (let i = 0; i < eduCount; i++) {
            eduForms.push( <EducationForm 
                                            index={i.toString()} 
                                            education={education}
                                            handleSchoolNameChange={handleSchoolNameChange}
                                            handleDegreeSelectChange={handleDegreeSelectChange}
                                            handleTitleStudyChange={handleTitleStudyChange}
                                            handleStudyStartChange={handleStudyStartChange}
                                            handleStudyEndChange={handleStudyEndChange} 
                                            handleSubmit={handleSubmit}
                                            formEditingHandler={formEditingHandler} 
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
                        handleClose 
                    }) {
    index = index.toString();
    return (
        <>
            <button className='close-button' type='button' onClick={handleClose}>&times;</button>
            <form id='education-form' onSubmit={handleSubmit} onClick={formEditingHandler} data-index={index}>
                {/* school name input  */}
                <label> College Name
                    <input type='text'
                            name='school-name'
                            placeholder=''
                            value={education.get(index).name}
                            onChange={handleSchoolNameChange} />
                </label>

                <div className='degree-wrapper'>
                    {/* degree type selection */}
                    <label> Degree
                        <select name='degree'
                                id='degree-select'
                                value={education.get(index).degree} 
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
                                    value={education.get(index).title}
                                    onChange={handleTitleStudyChange} />
                    </label>
                </div>

                {/* date of study input */}
                <div>
                    <label htmlFor="date-study-start" className='date-study-lbl'>Date of Study</label>
                    <div className="date-inputs-wrapper">
                        <input type='date'
                                    name='date-study-start'
                                    id='date-study-start'
                                    placeholder=''
                                    value={education.get(index).start}
                                    onChange={handleStudyStartChange} />
                        <span> to </span>
                        <input type='date'
                                    name='date-study-end'
                                    placeholder=''
                                    value={education.get(index).end}
                                    onChange={handleStudyEndChange} />
                    </div>
                </div>
            </form>
        </>
    )
}