import { useState, useReducer } from 'react';
import { GeneralInfo } from './components';
import { Welcome } from './components';
import { LeftArrow } from './components';
import { RightArrow } from './components';
import { Education } from './components';
import { Work } from './components';
import { InvalidForms } from './components';
import { checkIsValid } from './utils';

// PAGE NUMBER CONSTANTS
const PAGE_NUMS = {
    WELCOME_PAGE: 0,
    GENERAL_INFO: 1,
    EDUCATION: 2,
    WORK: 3,
    REVIEW: 4,
    SUBMITTED: 5
}

// template object for form input variables
const inputTemplateObj = {  
                            value: '',
                            isValid: true,
                            message: '' 
}

const statusReducer = (status, action) => {
    switch(action.type) {
        case 'clicked_right': {
            return status + 1;
        }
        case 'clicked_left': {
            return status - 1;
        }
        case 'clicked_edit': {
            return action.page;
        }
        default: {
            throw Error('Error! Unknown action in status reducer: ' + action.type);
        }
    }
}

export function App() {
  const [status, statusDispatch] = useReducer(statusReducer, PAGE_NUMS.WELCOME_PAGE);
  const [generalInfo, setGeneralInfo] = useState({  
                                                    firstName: {...inputTemplateObj},
                                                    lastName: {...inputTemplateObj},
                                                    email: {...inputTemplateObj},
                                                    phone: {...inputTemplateObj},
                                                    isValid: null 
                                                });
  const [education, setEducation] = useState(new Map());
  const [formEditing, setFormEditing] = useState(0);
  const [work, setWork] = useState(new Map());
  const [unsavedChange, setUnsavedChange] = useState(false);

  const handlePageChange = (page) => {
    statusDispatch({
        type: 'clicked_edit',
        page: page
    })
  }

  const handleFormChange = () => {
    setUnsavedChange(true);
  }

  /* handler for close button on education forms
     removes the entry from education map, reduces the edu count, and moves entries with indices higher than the deleted index up one place 
  */
  const handleEduClose = (e) => {
    let indexToDelete = Number(e.target.nextSibling.dataset.index);
    let newEdu = new Map();
    for (const [index, edu] of education.entries()){
        if (index > indexToDelete){
            newEdu.set((index - 1), edu);
        }
        else if (index < indexToDelete){
            newEdu.set(index, edu);
        }
    }
    setEducation(newEdu);
    setFormEditing(0);
  }

  /* handler for close button on work forms
     removes the entry from work map, reduces the work count, and moves entries with indices higher than the deleted index up one place 
  */
  const handleWorkClose = (e) => {
    let indexToDelete = Number(e.target.nextSibling.dataset.index);
    let newWork = new Map();
    for (const [index, job] of work.entries()){
        if (index > indexToDelete){
            newWork.set((index - 1), job);
        }
        else if (index < indexToDelete){
            newWork.set(index, job);
        }
    }
    setWork(newWork);
    setFormEditing(0);
  }

  const handleAddWorkClick = () => {
    const newWork = new Map(work);
    newWork.set(work.size, { 
                            title: {...inputTemplateObj},
                            company: {...inputTemplateObj},
                            location: {...inputTemplateObj},
                            description: {...inputTemplateObj},
                            start: {...inputTemplateObj},
                            end: {...inputTemplateObj},
                            isValid: false
                            });                                         
    setWork(newWork);
  }

  const handleWorkSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = Number(form.dataset.index);
    const jobTitleInput = form.querySelector('input[name="position-title"]');
    const compNameInput = form.querySelector('input[name="company-name"]');
    const compLocationInput = form.querySelector('input[name="company-location"]');
    const jobDescInput = form.querySelector('.job-desc-txtarea');
    const workStartInput = form.querySelector('input[name="date-work-start"]');
    const workEndInput = form.querySelector('input[name="date-work-end"]');

    const newWork = new Map(work);
    const newWorkAtIndex = newWork.get(id);
    let allValid = true;

    if (workEndInput.value !== '') {
        workEndInput.classList.add('empty-date');
    }
    else {
        workEndInput.classList.remove('empty-date');
    }

    if (jobDescInput.value) {
        jobDescInput.classList.add('valid');
    }

    const jobDesc = newWorkAtIndex.description;
    newWorkAtIndex.description = {...jobDesc,
                                     value: jobDescInput.value,
                                     isValid: true
                                 };



    const jobTitle = newWorkAtIndex.title;
    if (jobTitleInput.validity.valid) {
        newWorkAtIndex.title = { ...jobTitle,
                                        value: jobTitleInput.value,
                                        isValid: true,
                                     };
        jobTitleInput.classList.remove('invalid');
    } else {
        newWorkAtIndex.title = { ...jobTitle,
                                        isValid: false,
                                        message: 'required'
                                    };
        jobTitleInput.classList.add('invalid');
        allValid = false;
    }

    const compName = newWorkAtIndex.company;
    if (compNameInput.validity.valid) {
        newWorkAtIndex.company = { ...compName, 
                                    value: compNameInput.value,
                                    isValid: true,
                                };
        compNameInput.classList.remove('invalid');
    } else {
        newWorkAtIndex.company = { ...compName,
                                        isValid: false,
                                        message: 'required'
                                    };
        compNameInput.classList.add('invalid');
        allValid = false;
    }

    const compLocation = newWorkAtIndex.location;
    if (compLocationInput.validity.valid) {
        newWorkAtIndex.location = { ...compLocation, 
                                    value: compLocationInput.value,
                                    isValid: true,
                                };
        compLocationInput.classList.remove('invalid');
    } else {
        newWorkAtIndex.location = { ...compLocation,
                                        isValid: false,
                                        message: 'required'
                                    };
        compLocationInput.classList.add('invalid');
        allValid = false;
    }

    const workStart = newWorkAtIndex.start;
    const workEnd = newWorkAtIndex.end;
    // check the start and end dates, make them invalid if start is after end
    if ((Date.parse(workStartInput.value)) > (Date.parse(workEndInput.value))) {
        workStartInput.setCustomValidity('Start date must be before end date');
        workEndInput.setCustomValidity('Start date must be before end date');

        newWorkAtIndex.start = { ...workStart,
            isValid: false,
            message: 'Start date must be before end date'
        };

        workStartInput.classList.add('invalid');
        workEndInput.classList.add('invalid');
        workStartInput.classList.remove('valid');
        workEndInput.classList.remove('valid');
        allValid = false;
    } else { // the dates are not conflicting
        if (workStartInput.validity.valueMissing) {
            newWorkAtIndex.start = { ...workStart,
                isValid: false,
                message: 'Start date required'
            };
            workStartInput.classList.add('invalid');
            workStartInput.classList.remove('valid');
            workEndInput.classList.remove('valid');
            allValid = false;
        } else {
            newWorkAtIndex.start = { ...workStart, 
                value: workStartInput.value,
                isValid: true,
            };

            newWorkAtIndex.end = { ...workEnd, 
                value: workEndInput.value,
                isValid: true,
            };

            workStartInput.classList.add('valid');
            workEndInput.classList.add('valid');
            workStartInput.classList.remove('invalid');
            workEndInput.classList.remove('invalid');
        }
    }

    newWorkAtIndex.isValid = allValid;
    setWork(newWork);
    setUnsavedChange(false);
  }

  const handleWorkInput = (e, prop) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing)[prop].isValid = true;
        setWork(newWork);
    }
  }

  const formEditingHandler = (e) => {
    setFormEditing(Number(e.target.closest('form').dataset.index));
  }

  const handleAddEducationClick = () => {
    const newEducation = new Map(education);
    newEducation.set(education.size, { 
                                        name: {...inputTemplateObj},
                                        degree: {...inputTemplateObj},
                                        title: {...inputTemplateObj},
                                        start: {...inputTemplateObj},
                                        end: {...inputTemplateObj},
                                        isValid: false 
                                    });

    setEducation(newEducation);
  }

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = Number(form.dataset.index);

    const schoolNameInput = form.querySelector('input[name="school-name"]');
    const degreeInput = form.querySelector('select[name="degree"]');
    const titleStudyInput = form.querySelector('input[name="title-study"]');
    const studyStartInput = form.querySelector('input[name="date-study-start"]');
    const studyEndInput = form.querySelector('input[name="date-study-end"]');

    const newEducation = new Map(education);
    const newEdu = newEducation.get(id);
    let allValid = true;

    if (!studyEndInput.value !== '') {
        studyEndInput.classList.add('empty-date');
    }
    else {
        studyEndInput.classList.remove('empty-date');
    }

    const schoolName = newEdu.name;
    if (schoolNameInput.validity.valid) {
        newEdu.name = { ...schoolName,
                                        value: schoolNameInput.value,
                                        isValid: true,
                                     };
        schoolNameInput.classList.remove('invalid');
    } else {
        newEdu.name = { ...schoolName,
                                        isValid: false,
                                        message: 'required'
                                    };
        allValid = false;
        schoolNameInput.classList.add('invalid');
    }

    const degree = newEdu.degree;
    if (degreeInput.validity.valid) {
        newEdu.degree = { ...degree,
                                        value: degreeInput.value,
                                        isValid: true,
                                     };
        degreeInput.classList.add('valid');
        degreeInput.classList.remove('invalid');
    } else {
        newEdu.degree = { ...degree,
                                        isValid: false,
                                        message: 'required'
                                    };
        allValid = false;
        degreeInput.classList.remove('valid');
        degreeInput.classList.add('invalid');
    }

    const titleStudy = newEdu.title;
    if (titleStudyInput.validity.valid) {
        newEdu.title = { ...titleStudy,
                                        value: titleStudyInput.value,
                                        isValid: true,
                                     };
        titleStudyInput.classList.remove('invalid');
    } else {
        newEdu.title = { ...titleStudy,
                                        isValid: false,
                                        message: 'required'
                                    };
        titleStudyInput.classList.add('invalid');
        allValid = false;
    }

    const studyStart = newEdu.start;
    const studyEnd = newEdu.end;

    if ((Date.parse(studyStartInput.value)) > (Date.parse(studyEndInput.value))) {
        studyStartInput.setCustomValidity('Start date must be before end date');
        studyEndInput.setCustomValidity('Start date must be before end date');
        newEdu.start = { ...studyStart,
            isValid: false,
            message: 'Start date must be before end date'
        };

        studyStartInput.classList.add('invalid');
        studyEndInput.classList.add('invalid');
        studyStartInput.classList.remove('valid');
        studyEndInput.classList.remove('valid');
        allValid = false;
    } else {
        if (studyStartInput.validity.valueMissing) {
            newEdu.start = { ...studyStart,
                            isValid: false,
                            message: 'Start date required'
                           };
            studyStartInput.classList.add('invalid');
            studyStartInput.classList.remove('valid');
            studyEndInput.classList.remove('valid');
            allValid = false;
        } else {
            newEdu.start = { ...studyStart,
                value: studyStartInput.value,
                isValid: true,
             };

             newEdu.end = { ...studyEnd,
                value: studyEndInput.value,
                isValid: true,
             };

             studyStartInput.classList.remove('invalid');
             studyEndInput.classList.remove('invalid');
             studyStartInput.classList.add('valid');
             studyEndInput.classList.add('valid');
        }
    }

    newEdu.isValid = allValid;
    setEducation(newEducation);
    setUnsavedChange(false);
  }
  
  const handleEducationInput = (e, prop) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing)[prop].isValid = true;
        setEducation(newEducation);
    }
  }

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const firstNameInput = document.querySelector('input[name="first-name"]');
    const lastNameInput = document.querySelector('input[name="last-name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phone"]');

    const newInfo = {...generalInfo}
    newInfo.isValid = true;

    if (firstNameInput.validity.valid) {
        newInfo.firstName = { ...generalInfo.firstName, value: formData.get('first-name'), isValid: true, message: '' }
        firstNameInput.classList.remove('invalid');
    } else {
        newInfo.firstName = { ...generalInfo.firstName, value: '', isValid: false, message: 'required' }
        firstNameInput.classList.add('invalid');
        newInfo.isValid = false;
    }

    if (lastNameInput.validity.valid) {
        newInfo.lastName = { ...generalInfo.lastName, value: formData.get('last-name'), isValid: true, message: '' }
        lastNameInput.classList.remove('invalid');
    } else {
        newInfo.lastName = { ...generalInfo.lastName, value: '', isValid: false, message: 'required' }
        lastNameInput.classList.add('invalid');
        newInfo.isValid = false;
    }

    if (emailInput.validity.valid) {
        newInfo.email = { ...generalInfo.email, value: formData.get('email'), isValid: true, message: '' }
        emailInput.classList.remove('invalid');
    } else {
        newInfo.email = { ...generalInfo.email, value: '', isValid: false }
        if (emailInput.validity.valueMissing) { newInfo.email.message = 'required'; } 
        else if (emailInput.validity.typeMismatch) { newInfo.email.message = 'not a valid email' }

        newInfo.isValid = false;
        emailInput.classList.add('invalid');
    }

    if (phoneInput.validity.valid) {
        newInfo.phone = { ...generalInfo.phone, value: formData.get('phone'), isValid: true, message: '' }
        phoneInput.classList.remove('invalid');
    } else {
        newInfo.phone = { ...generalInfo.phone, value: '', isValid: false}
        if (phoneInput.validity.valueMissing) { newInfo.phone.message = 'required'; } 
        else if (phoneInput.validity.patternMismatch) { newInfo.phone.message = 'format: 555-555-5555' }

        newInfo.isValid = false;
        phoneInput.classList.add('invalid');
    }

    setGeneralInfo(newInfo);
    setUnsavedChange(false);
  }

  const handleGeneralInput = (e, prop) => {
    if (e.target.checkValidity()) {
        const newGenInfo = {...generalInfo}
        newGenInfo[prop].isValid = true;
        setGeneralInfo(newGenInfo);
    }
  }

  const handleRightArrowClick = () => {
    setUnsavedChange(false);
    statusDispatch({
        type: 'clicked_right'
    })
  }

  const handleLeftArrowClick = () => {
    setUnsavedChange(false);
    statusDispatch({
        type: 'clicked_left'
    })
  }

  const generalInfoProps = {
    generalInfo: generalInfo,
    handleGeneralInput: handleGeneralInput,
    handleSubmit: handleGeneralSubmit,
    handleFormChange: handleFormChange,
    handlePageChange: handlePageChange
  }

  const educationProps = {
    education: education,
    handleEducationInput: handleEducationInput,
    handleSubmit: handleEducationSubmit,
    handleAddEducationClick: handleAddEducationClick,
    formEditingHandler: formEditingHandler,
    handleClose: handleEduClose,
    handleFormChange: handleFormChange,
    handlePageChange: handlePageChange
  }

  const workProps = {
    work: work,
    handleWorkInput: handleWorkInput,
    handleSubmit: handleWorkSubmit,
    handleAddWorkClick: handleAddWorkClick,
    formEditingHandler: formEditingHandler,
    handleClose: handleWorkClose,
    handleFormChange: handleFormChange,
    handlePageChange: handlePageChange
  }

  switch (status) {
    case PAGE_NUMS.WELCOME_PAGE: {
        return (
            <section className='main'>
                <Welcome />
                <RightArrow 
                    handleClick={handleRightArrowClick} 
                    hasChanged={unsavedChange} 
                />
            </section>
        )
    }
    case PAGE_NUMS.GENERAL_INFO: {
        return (
            <section className='main'>
                <LeftArrow 
                    handleClick={handleLeftArrowClick} 
                    hasChanged={unsavedChange} 
                />
                <GeneralInfo  {...generalInfoProps} />
                <RightArrow 
                    handleClick={handleRightArrowClick} 
                    hasChanged={unsavedChange} 
                />
            </section>
        )
    }
    case PAGE_NUMS.EDUCATION: {
        return (
            <section className='main'>
                <LeftArrow 
                    handleClick={handleLeftArrowClick} 
                    hasChanged={unsavedChange} 
                />
                <Education {...educationProps} />
                <RightArrow 
                    handleClick={handleRightArrowClick} 
                    hasChanged={unsavedChange} 
                />
            </section>
        )
    }
    case PAGE_NUMS.WORK: {
        return(
            <section className='main'>
                <LeftArrow 
                    handleClick={handleLeftArrowClick} 
                    hasChanged={unsavedChange} 
                />
                <Work {...workProps} />
                <RightArrow 
                    handleClick={handleRightArrowClick} 
                    hasChanged={unsavedChange} 
                />
            </section>
        )
    }
    case PAGE_NUMS.REVIEW: {
        // check if the forms are valid or not to determine what to render on this page
        let educationIsValid = checkIsValid(education);
        let workIsValid = checkIsValid(work);

        // check all three are valid
        const validForms = (generalInfo.isValid && educationIsValid && workIsValid); 
        return (
            <section className='main'>
                <LeftArrow 
                    handleClick={handleLeftArrowClick} 
                    hasChanged={unsavedChange} 
                />
                <section className='content'>
                    <h1>Review Information</h1>
                    {/* if the forms are not valid, render invalidForms */}
                    {!validForms &&
                        <InvalidForms 
                            generalIsValid={generalInfo.isValid} 
                            educationIsValid={educationIsValid} 
                            workIsValid={workIsValid} 
                            handlePageChange={handlePageChange} 
                        /> 
                    }
                    {validForms &&
                        <> 
                            <GeneralInfo  {...generalInfoProps} review={true} /> 
                            <Education {...educationProps} review={true} />
                            <Work {...workProps} review={true} />
                            <button onClick={() => handlePageChange(PAGE_NUMS.SUBMITTED)} 
                                className='submit-button'>
                                Submit Application</button>
                        </>
                    }
                </section>
            </section>
        )    
    }
    case PAGE_NUMS.SUBMITTED: {
        return (
            <section>
                <img className='check-mark-icon' src='assets/checkbox-outline.svg' alt='check-mark icon' />
                <h2>Application Submitted</h2>
                <p>Thank you for submitting your application.</p>
                <p>We will review your application and notify you if you are selected to move forward.</p>
            </section>
        )
    }
    default: {
        throw Error('Error! Not a valid page. Status = ' + status);
    } 
  }
}
