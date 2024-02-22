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

function App() {
  const [status, setStatus] = useState(WELCOME_PAGE);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState(new Map());
  const [eduCount, setEduCount] = useState(0);
  const [eduFormEdit, setEduFormEdit] = useState(null);
  const [work, setWork] = useState(new Map());
  const [workCount, setWorkCount] = useState(0);

  const handleAddWorkClick = (e) => {
    setWorkCount(workCount + 1);
  }

  const eduFormEditHandler = (e) => {
    setEduFormEdit(e.target.closest('#education-form').dataset.index);
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
    newEducation.get(eduFormEdit).name = e.target.value;
    setEducation(newEducation);
  }

  const handleDegreeSelectChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(eduFormEdit).degree = e.target.value;
    setEducation(newEducation);
  }

  const handleTitleStudyChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(eduFormEdit).title = e.target.value;
    setEducation(newEducation);
  }

  const handleStudyStartChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(eduFormEdit).start = e.target.value;
    setEducation(newEducation);
  }

  const handleStudyEndChange = (e) => {
    let newEducation = new Map(education);
    newEducation.get(eduFormEdit).end = e.target.value;
    setEducation(newEducation);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleRightArrowClick = () => {
    setStatus(status + 1);
  }

  const handleLeftArrowClick = () => {
    setStatus(status - 1);
  }


  if (status === WELCOME_PAGE) {
    return (
        <>
            <Welcome />
            <RightArrow handleClick={handleRightArrowClick} />
        </>
    )
  }
  else if (status === GENERAL_INFO) {
    return (
        <>
            <LeftArrow handleClick={handleLeftArrowClick}/>

            <GeneralInfo firstName={firstName}
                          lastName={lastName}
                          email={email}
                          phone={phone}
                          handleFirstNameChange={handleFirstNameChange}
                          handleLastNameChange={handleLastNameChange}
                          handleEmailChange={handleEmailChange}
                          handlePhoneChange={handlePhoneChange}
                          handleSubmit={handleSubmit} />

            <RightArrow handleClick={handleRightArrowClick} form='general-form'/>
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
                   eduFormEditHandler={eduFormEditHandler} />

        <RightArrow handleClick={handleRightArrowClick} form='general-form'/>
    </>
    )
  }
  else if (status === WORK) {
    return(
        <>
            <LeftArrow handleClick={handleLeftArrowClick}/>

            <Work workCount={workCount}
                  handleAddWorkClick={handleAddWorkClick} />

            <RightArrow handleClick={handleRightArrowClick} form='general-form'/>
        </>
    )}
}

export default App;
