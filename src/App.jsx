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

const inputTemplateObj = {  value: '',
                            isValid: true,
                            message: '' 
                         }

function App() {
  const [status, setStatus] = useState(WELCOME_PAGE);
  const [firstName, setFirstName] = useState({ value: '', isValid: true, message: '' });
  const [lastName, setLastName] = useState({ value: '', isValid: true, message: '' });
  const [email, setEmail] = useState({ value: '', isValid: true, message: '' });
  const [phone, setPhone] = useState({ value: '', isValid: true, message: '' });
  const [education, setEducation] = useState(new Map());
  const [eduCount, setEduCount] = useState(0);
  const [formEditing, setFormEditing] = useState(0);
  const [work, setWork] = useState(new Map());
  const [workCount, setWorkCount] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);

  const handleFormChange = () => {
    setHasChanged(true);
  }

  const handleWorkSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.index.toString();

    const jobTitleInput = form.querySelector('input[name="position-title"]');
    const compNameInput = form.querySelector('input[name="company-name"]');
    const compLocationInput = form.querySelector('input[name="company-location"]');
    const jobDescInput = form.querySelector('.job-desc-txtarea');
    const workStartInput = form.querySelector('input[name="date-work-start"]');
    const workEndInput = form.querySelector('input[name="date-work-end"]');

    if (!workEndInput.value) {
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
        newWorkAtIndex.company = { ...jobTitle,
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
            workStartInput.classList.add('valid');
            workEndInput.classList.add('valid');
            workStartInput.classList.remove('invalid');
            workEndInput.classList.remove('invalid');
        }
    }

    setWork(newWork);
    setHasChanged(false);
  }

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.index.toString();

    const schoolNameInput = form.querySelector('input[name="school-name"]');
    const degreeInput = form.querySelector('select[name="degree"]');
    const titleStudyInput = form.querySelector('input[name="title-study"]');
    const studyStartInput = form.querySelector('input[name="date-study-start"]');
    const studyEndInput = form.querySelector('input[name="date-study-end"]');

    const newEducation = new Map(education);
    const newEdu = newEducation.get(id);

    if (!studyEndInput.value) {
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
             studyStartInput.classList.remove('invalid');
             studyEndInput.classList.remove('invalid');
             studyStartInput.classList.add('valid');
             studyEndInput.classList.add('valid');
        }
    }
    
    setEducation(newEducation);
    setHasChanged(false);
  }

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const firstNameInput = document.querySelector('input[name="first-name"]');
    const lastNameInput = document.querySelector('input[name="last-name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phone"]');


    if (firstNameInput.validity.valid) {
        const newName = { ...firstName, value: formData.get('first-name'), isValid: true, message: '' }
        setFirstName(newName);
        firstNameInput.classList.remove('invalid');
    } else {
        const newName = { ...firstName, isValid: false, message: 'required' }
        setFirstName(newName);
        firstNameInput.classList.add('invalid');
    }

    if (lastNameInput.validity.valid) {
        const newName = { ...lastName, value: formData.get('last-name'), isValid: true, message: '' }
        setLastName(newName);    
        lastNameInput.classList.remove('invalid');
    } else {
        const newName = { ...lastName, isValid: false, message: 'required' }
        setLastName(newName);
        lastNameInput.classList.add('invalid');
    }

    if (emailInput.validity.valid) {
        const newEmail = { ...email, value: formData.get('email'), isValid: true, message: '' }
        setEmail(newEmail);
        emailInput.classList.remove('invalid');
    } else {
        const newEmail = { ...email, isValid: false }
        if (emailInput.validity.valueMissing) { newEmail.message = 'required'; } 
        else if (emailInput.validity.typeMismatch) { newEmail.message = 'not a valid email' }

        setEmail(newEmail);
        emailInput.classList.add('invalid');
    }

    if (phoneInput.validity.valid) {
        const newPhone = { ...phone, value: formData.get('phone'), isValid: true, message: '' }
        setPhone(newPhone);
        phoneInput.classList.remove('invalid');
    } else {
        const newPhone = { ...phone, isValid: false}
        if (phoneInput.validity.valueMissing) { newPhone.message = 'required'; } 
        else if (phoneInput.validity.patternMismatch) { newPhone.message = 'format: 555-555-5555' }

        setPhone(newPhone);
        phoneInput.classList.add('invalid');
    }
    setHasChanged(false);
  }

  /* handler for close button on education forms
     removes the entry from education map, reduces the edu count, and moves entries with indices higher than the deleted index up one place 
  */
  const handleEduClose = (e) => {
    let indexToDelete = e.target.nextSibling.dataset.index;
    let newEdu = new Map();
    for (const [index, edu] of education.entries()){
        if (index > indexToDelete){
            newEdu.set((index - 1).toString(), edu);
        }
        else if (index < Number(indexToDelete)){
            newEdu.set(index.toString(), edu);
        }
    }
    setEduCount(eduCount - 1);
    setEducation(newEdu);
    setFormEditing(0);
  }

  /* handler for close button on work forms
     removes the entry from work map, reduces the work count, and moves entries with indices higher than the deleted index up one place 
  */
  const handleWorkClose = (e) => {
    let indexToDelete = e.target.nextSibling.dataset.index;
    let newWork = new Map();
    for (const [index, job] of work.entries()){
        if (index > indexToDelete){
            newWork.set((index - 1).toString(), job);
        }
        else if (index < Number(indexToDelete)){
            newWork.set(index.toString(), job);
        }
    }
    setWorkCount(workCount - 1);
    setWork(newWork);
    setFormEditing(0);
  }

  const handleAddWorkClick = () => {
    setWorkCount(workCount + 1);
    let newWork = work.set(workCount.toString(), { title: {...inputTemplateObj},
                                                   company: {...inputTemplateObj},
                                                   location: {...inputTemplateObj},
                                                   description: {...inputTemplateObj},
                                                   start: {...inputTemplateObj},
                                                   end: {...inputTemplateObj}
                                                 });
    setWork(newWork);
  }

  const handleWorkTitleChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing.toString()).title.isValid = true;
        setWork(newWork);
    }
  }

  const handleCompanyNameChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing.toString()).company.isValid = true;
        setWork(newWork);
    }
  }

  const handleCompanyLocationChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing.toString()).location.isValid = true;
        setWork(newWork);
    }
  }

  const handleWorkDescriptionChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing.toString()).description.isValid = true;
        setWork(newWork);
    }
  }

  const handleWorkStartChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing.toString()).start.isValid = true;
        setWork(newWork);
    }
  }

  const handleWorkEndChange = (e) => {
    if (e.target.checkValidity()) {
        let newWork = new Map(work);
        newWork.get(formEditing.toString()).end.isValid = true;
        setWork(newWork);
    }
  }

  const formEditingHandler = (e) => {
    setFormEditing(e.target.closest('form').dataset.index);
  }

  const handleAddEducationClick = () => {
    setEduCount(eduCount + 1);
    let newEducation = education.set(eduCount.toString(), { name: {...inputTemplateObj},
                                                            degree: {...inputTemplateObj},
                                                            title: {...inputTemplateObj},
                                                            start: {...inputTemplateObj},
                                                            end: {...inputTemplateObj} 
                                                        });

    setEducation(newEducation);
  }
  
  const handleSchoolNameChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing.toString()).name.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleDegreeSelectChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing.toString()).degree.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleTitleStudyChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing.toString()).title.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleStudyStartChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing.toString()).start.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleStudyEndChange = (e) => {
    if (e.target.checkValidity()) {
        let newEducation = new Map(education);
        newEducation.get(formEditing.toString()).end.isValid = true;
        setEducation(newEducation);
    }
  }

  const handleFirstNameChange = (e) => {
    if (e.target.checkValidity()) {
        const newName = {...firstName, isValid: true}
        setFirstName(newName);
    }
  }

  const handleLastNameChange = (e) => {
    if (e.target.checkValidity()) {
        const newName = {...lastName, isValid: true}
        setLastName(newName);
    }
  }

  const handleEmailChange = (e) => {
    if (e.target.checkValidity()) {
        const newEmail = {...email, isValid: true}
        setEmail(newEmail);
    }
  }

  const handlePhoneChange = (e) => {
    if (e.target.checkValidity()) {
        const newPhone = {...phone, isValid: true}
        setPhone(newPhone);
    }
  }

  const handleRightArrowClick = () => {
    setHasChanged(false);
    setStatus(status + 1);
  }

  const handleLeftArrowClick = () => {
    setHasChanged(false);
    setStatus(status - 1);
  }


  if (status === WELCOME_PAGE) {
    return (
        <>
            <Welcome />
            <RightArrow handleClick={handleRightArrowClick} hasChanged={hasChanged} />
        </>
    )
  }
  else if (status === GENERAL_INFO) {
    return (
        <>
            <LeftArrow handleClick={handleLeftArrowClick} hasChanged={hasChanged} />

            <GeneralInfo  firstName={firstName}
                          lastName={lastName}
                          email={email}
                          phone={phone}
                          handleFirstNameChange={handleFirstNameChange}
                          handleLastNameChange={handleLastNameChange}
                          handleEmailChange={handleEmailChange}
                          handlePhoneChange={handlePhoneChange} 
                          handleSubmit={handleGeneralSubmit}
                          handleFormChange={handleFormChange} />

            <RightArrow handleClick={handleRightArrowClick} hasChanged={hasChanged} />
        </>
    )
  }
  else if (status === EDUCATION) {
    return (
        <>
        <LeftArrow handleClick={handleLeftArrowClick} hasChanged={hasChanged} />

        <Education education={education}
                   eduCount={eduCount}
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

        <RightArrow handleClick={handleRightArrowClick} hasChanged={hasChanged} />
    </>
    )
  }
  else if (status === WORK) {
    return(
        <>
            <LeftArrow handleClick={handleLeftArrowClick} hasChanged={hasChanged} />

            <Work work={work}
                  workCount={workCount}
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

            <RightArrow handleClick={handleRightArrowClick} hasChanged={hasChanged} />
        </>
    )}
}

export default App;
