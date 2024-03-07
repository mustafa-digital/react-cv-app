import { useState } from 'react';
import { GeneralInfo } from './components/GeneralInfo';
import { Welcome } from './components/Welcome';
import { LeftArrow } from './components/LeftArrow';
import { RightArrow } from './components/RightArrow';
import { Education } from './components/Education';
import { Work } from './components/Work';

const WELCOME_PAGE = 0;
const GENERAL_INFO = 1;
const EDUCATION = 2;
const WORK = 3;
const REVIEW = 4;
const SUBMITTED = 5;

const inputTemplateObj = {  value: '',
                            isValid: true,
                            message: '' 
                         }

function App() {
  const [status, setStatus] = useState(WELCOME_PAGE);
  const [generalInfo, setGeneralInfo] = useState({  firstName: {...inputTemplateObj},
                                                    lastName: {...inputTemplateObj},
                                                    email: {...inputTemplateObj},
                                                    phone: {...inputTemplateObj},
                                                    isValid: null 
                                                });
  const [education, setEducation] = useState(new Map());
  const [formEditing, setFormEditing] = useState(0);
  const [work, setWork] = useState(new Map());
  const [unsavedChange, setUnsavedChange] = useState(false);

  const handleGeneralEdit = () => {
    setStatus(GENERAL_INFO);
  }

  const handleFormChange = () => {
    setUnsavedChange(true);
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

    if (workEndInput.value !== '') {
        workEndInput.classList.add('empty-date');
    }
    else {
        workEndInput.classList.remove('empty-date');
    }

    if (jobDescInput.value) {
        jobDescInput.classList.add('valid');
    }

    const newWork = new Map(work);
    const newWorkAtIndex = newWork.get(id);

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
    } else { // the dates are not conflicting
        if (workStartInput.validity.valueMissing) {
            newWorkAtIndex.start = { ...workStart,
                isValid: false,
                message: 'Start date required'
            };
            workStartInput.classList.add('invalid');
            workStartInput.classList.remove('valid');
            workEndInput.classList.remove('valid');
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

    setWork(newWork);
    setUnsavedChange(false);
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
    } else {
        if (studyStartInput.validity.valueMissing) {
            newEdu.start = { ...studyStart,
                            isValid: false,
                            message: 'Start date required'
                           };
            studyStartInput.classList.add('invalid');
            studyStartInput.classList.remove('valid');
            studyEndInput.classList.remove('valid');
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
    
    setEducation(newEducation);
    setUnsavedChange(false);
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
    newWork.set(work.size, { title: {...inputTemplateObj},
                                                   company: {...inputTemplateObj},
                                                   location: {...inputTemplateObj},
                                                   description: {...inputTemplateObj},
                                                   start: {...inputTemplateObj},
                                                   end: {...inputTemplateObj},
                                                   isValid: true
                                                 });                                         
    setWork(newWork);
  }

  const handleWorkTitleChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing).title.isValid = true;
        setWork(newWork);
    }
  }

  const handleCompanyNameChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing).company.isValid = true;
        setWork(newWork);
    }
  }

  const handleCompanyLocationChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing).location.isValid = true;
        setWork(newWork);
    }
  }

  const handleWorkDescriptionChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing).description.isValid = true;
        setWork(newWork);
    }
  }

  const handleWorkStartChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing).start.isValid = true;
        setWork(newWork);
    }
  }

  const handleWorkEndChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing).end.isValid = true;
        setWork(newWork);
    }
  }

  const formEditingHandler = (e) => {
    setFormEditing(Number(e.target.closest('form').dataset.index));
  }

  const handleAddEducationClick = () => {
    const newEducation = new Map(education);
    newEducation.set(education.size, { name: {...inputTemplateObj},
                                                            degree: {...inputTemplateObj},
                                                            title: {...inputTemplateObj},
                                                            start: {...inputTemplateObj},
                                                            end: {...inputTemplateObj},
                                                            isValid: true 
                                                        });

    setEducation(newEducation);
  }
  
  const handleSchoolNameChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing).name.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleDegreeSelectChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing).degree.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleTitleStudyChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing).title.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleStudyStartChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing).start.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleStudyEndChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing).end.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleFirstNameChange = (e) => {
    if (e.target.checkValidity()) {
        const newGenInfo = {...generalInfo}
        newGenInfo.firstName.isValid = true;
        setGeneralInfo(newGenInfo);
    }
  }

  const handleLastNameChange = (e) => {
    if (e.target.checkValidity()) {
        const newGenInfo = {...generalInfo}
        newGenInfo.lastName.isValid = true;
        setGeneralInfo(newGenInfo);
    }
  }

  const handleEmailChange = (e) => {
    if (e.target.checkValidity()) {
        const newGenInfo = {...generalInfo}
        newGenInfo.email.isValid = true;
        setGeneralInfo(newGenInfo);
    }
  }

  const handlePhoneChange = (e) => {
    if (e.target.checkValidity()) {
        const newGenInfo = {...generalInfo}
        newGenInfo.phone.isValid = true;
        setGeneralInfo(newGenInfo);
    }
  }

  const handleRightArrowClick = () => {
    setUnsavedChange(false);
    setStatus(status + 1);
  }

  const handleLeftArrowClick = () => {
    setUnsavedChange(false);
    setStatus(status - 1);
  }


  if (status === WELCOME_PAGE) {
    return (
        <>
            <Welcome />
            <RightArrow handleClick={handleRightArrowClick} hasChanged={unsavedChange} />
        </>
    )
  }
  else if (status === GENERAL_INFO) {
    return (
        <>
            <LeftArrow handleClick={handleLeftArrowClick} hasChanged={unsavedChange} />

            <GeneralInfo  generalInfo={generalInfo}
                          handleFirstNameChange={handleFirstNameChange}
                          handleLastNameChange={handleLastNameChange}
                          handleEmailChange={handleEmailChange}
                          handlePhoneChange={handlePhoneChange} 
                          handleSubmit={handleGeneralSubmit}
                          handleFormChange={handleFormChange} />

            <RightArrow handleClick={handleRightArrowClick} hasChanged={unsavedChange} />
        </>
    )
  }
  else if (status === EDUCATION) {
    return (
        <>
        <LeftArrow handleClick={handleLeftArrowClick} hasChanged={unsavedChange} />

        <Education education={education}
                   handleSchoolNameChange={handleSchoolNameChange}
                   handleDegreeSelectChange={handleDegreeSelectChange}
                   handleTitleStudyChange={handleTitleStudyChange}
                   handleStudyStartChange={handleStudyStartChange}
                   handleStudyEndChange={handleStudyEndChange} 
                   handleSubmit={handleEducationSubmit}
                   handleAddEducationClick={handleAddEducationClick}
                   formEditingHandler={formEditingHandler} 
                   handleClose={handleEduClose}
                   handleFormChange={handleFormChange} />

        <RightArrow handleClick={handleRightArrowClick} hasChanged={unsavedChange} />
    </>
    )
  }
  else if (status === WORK) {
    return(
        <>
            <LeftArrow handleClick={handleLeftArrowClick} hasChanged={unsavedChange} />

            <Work work={work}
                  handleWorkTitleChange={handleWorkTitleChange}
                  handleCompanyNameChange={handleCompanyNameChange}
                  handleCompanyLocationChange={handleCompanyLocationChange}
                  handleWorkDescriptionChange={handleWorkDescriptionChange}
                  handleWorkStartChange={handleWorkStartChange}
                  handleWorkEndChange={handleWorkEndChange}
                  handleSubmit={handleWorkSubmit}
                  handleAddWorkClick={handleAddWorkClick} 
                  formEditingHandler={formEditingHandler}
                  handleClose={handleWorkClose} 
                  handleFormChange={handleFormChange} />

            <RightArrow handleClick={handleRightArrowClick} hasChanged={unsavedChange} />
        </>
    )}
    else if (status === REVIEW) {
        let educationIsValid = true;
        for(const [id, edu] of education.entries()) {
            if (!edu.isValid){
                educationIsValid = false;
                break;
            }
        }

        // let workIsValid = true;
        // for(const [id, work] of work.entries()) {
        //     console.log(id);
        //     if (!work.isValid) {
        //         workIsValid = false;
        //         break;
        //     }
        // }

        const validForms = (generalInfo.isValid && educationIsValid);
        return (
            <>
                <LeftArrow handleClick={handleLeftArrowClick} hasChanged={unsavedChange} />
                <div className='review-section'>
                <h1>Review Information</h1>

                {generalInfo.isValid ?
                                <GeneralInfo  generalInfo={generalInfo}
                                handleFirstNameChange={handleFirstNameChange}
                                handleLastNameChange={handleLastNameChange}
                                handleEmailChange={handleEmailChange}
                                handlePhoneChange={handlePhoneChange} 
                                handleSubmit={handleGeneralSubmit}
                                handleFormChange={handleFormChange}
                                handleGeneralEdit={handleGeneralEdit}
                                review={true} /> 
                
                    : <p>General Info has invalid information</p>  
                }
                {validForms && <button onClick={() => setStatus(SUBMITTED)} className='submit-button'>Submit Application</button>}

                </div>


            </>
        )}
        else if (status === SUBMITTED) {
            return (
                <>
                    <img className='check-mark-icon' src='src/assets/checkbox-outline.svg' alt='check-mark icon' />
                    <h2>Application Submitted</h2>
                    <p>Thank you for submitting your application.</p>
                    <p>We will review your application and notify you if you are selected to move forward.</p>
                </>
            )
        }
}

export default App;
