import { useState } from 'react';
import { GeneralInfo } from './components/GeneralInfo';
import { Welcome } from './components/Welcome';
import { LeftArrow } from './components/LeftArrow';
import { RightArrow } from './components/RightArrow';
import { Education } from './components/Education';
import { Work } from './components/Work';
import { UnsavedChangesDialog } from './components/UnsavedChangesDialog';

const WELCOME_PAGE = 0;
const GENERAL_INFO = 1;
const EDUCATION = 2;
const WORK = 3;

function App() {
  const [status, setStatus] = useState(WELCOME_PAGE);
  const [firstName, setFirstName] = useState({ value: '', isValid: true, message: '' });
  const [lastName, setLastName] = useState({ value: '', isValid: true, message: '' });
  const [email, setEmail] = useState({ value: '', isValid: true, message: '' });
  const [phone, setPhone] = useState({ value: '', isValid: true, message: '' });
  const [education, setEducation] = useState(new Map());
  const [eduCount, setEduCount] = useState(0);
  const [formEditing, setFormEditing] = useState(null);
  const [work, setWork] = useState(new Map());
  const [workCount, setWorkCount] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);

  const handleFormChange = () => {
    setHasChanged(true);
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
    let newWork = work.set(workCount.toString(), { title: '',
                                                   company: '',
                                                   location: '',
                                                   description: '',
                                                   start: '',
                                                   end: ''
                                                 });
    setWork(newWork);
  }

  const handleWorkTitleChange = (e) => {
    let newWork = new Map(work);
    newWork.get(formEditing.toString()).title = e.target.value;
    setWork(newWork);
  }

  const handleCompanyNameChange = (e) => {
    let newWork = new Map(work);
    newWork.get(formEditing.toString()).company = e.target.value;
    setWork(newWork);
  }

  const handleCompanyLocationChange = (e) => {
    let newWork = new Map(work);
    newWork.get(formEditing.toString()).location = e.target.value;
    setWork(newWork);
  }

  const handleWorkDescriptionChange = (e) => {
    let newWork = new Map(work);
    newWork.get(formEditing.toString()).description = e.target.value;
    setWork(newWork);
  }

  const handleWorkStartChange = (e) => {
    let newWork = new Map(work);
    newWork.get(formEditing.toString()).start = e.target.value;
    setWork(newWork);
  }

  const handleWorkEndChange = (e) => {
    let newWork = new Map(work);
    newWork.get(formEditing.toString()).end = e.target.value;
    setWork(newWork);
  }

  const formEditingHandler = (e) => {
    setFormEditing(e.target.closest('form').dataset.index);
  }

  const handleAddEducationClick = () => {
    setEduCount(eduCount + 1);
    let newEducation = education.set(eduCount.toString(), { name: '',
                                                            degree: '',
                                                            title: '',
                                                            start: '',
                                                            end: '' 
                                                        });

    setEducation(newEducation);
  }
  
  const handleSchoolNameChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(formEditing.toString()).name = e.target.value;
    setEducation(newEducation);
  }

  const handleDegreeSelectChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(formEditing.toString()).degree = e.target.value;
    setEducation(newEducation);
  }

  const handleTitleStudyChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(formEditing.toString()).title = e.target.value;
    setEducation(newEducation);
  }

  const handleStudyStartChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(formEditing.toString()).start = e.target.value;
    setEducation(newEducation);
  }

  const handleStudyEndChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(formEditing.toString()).end = e.target.value;
    setEducation(newEducation);
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

  const handleSubmit = () => {
    // e.preventDefault();
    console.log('submitted');
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
            <LeftArrow handleClick={handleLeftArrowClick}/>

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
        <LeftArrow handleClick={handleLeftArrowClick}/>

        <Education education={education}
                   eduCount={eduCount}
                   handleSchoolNameChange={handleSchoolNameChange}
                   handleDegreeSelectChange={handleDegreeSelectChange}
                   handleTitleStudyChange={handleTitleStudyChange}
                   handleStudyStartChange={handleStudyStartChange}
                   handleStudyEndChange={handleStudyEndChange} 
                   handleSubmit={handleSubmit}
                   handleAddEducationClick={handleAddEducationClick}
                   formEditingHandler={formEditingHandler} 
                   handleClose={handleEduClose} />

        <RightArrow handleClick={handleRightArrowClick} hasChanged={hasChanged} />
    </>
    )
  }
  else if (status === WORK) {
    return(
        <>
            <LeftArrow handleClick={handleLeftArrowClick}/>

            <Work work={work}
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
                  handleClose={handleWorkClose} />

            <RightArrow handleClick={handleRightArrowClick} hasChanged={hasChanged} />
        </>
    )}
}

export default App;
