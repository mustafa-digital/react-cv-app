import { useState } from 'react';
import { GeneralInfo } from './components/GeneralInfo';
import { Welcome } from './components/Welcome';
import { LeftArrow } from './components/LeftArrow';
import { RightArrow } from './components/RightArrow';
import { Education } from './components/Education';

const WELCOME_PAGE = 0;
const GENERAL_INFO = 1;
const EDUCATION = 2;

function App() {
  const [status, setStatus] = useState(WELCOME_PAGE);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');
  const [titleStudy, setTitleStudy] = useState('');
  const [studyStart, setStudyStart] = useState('');
  const [studyEnd, setStudyEnd] = useState('');
  
  const handleSchoolNameChange = (e) => {
    setSchoolName(e.target.value);
  }

  const handleDegreeSelectChange = (e) => {
    setDegree(e.target.value);
  }

  const handleTitleStudyChange = (e) => {
    setTitleStudy(e.target.value);
  }

  const handleStudyStartChange = (e) => {
    setStudyStart(e.target.value);
  }

  const handleStudyEndChange = (e) => {
    setStudyEnd(e.target.value);
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

        <Education schoolName={schoolName}
                   degree={degree}
                   titleStudy={titleStudy}
                   studyStart={studyStart}
                   studyEnd={studyEnd}
                   handleSchoolNameChange={handleSchoolNameChange}
                   handleDegreeSelectChange={handleDegreeSelectChange}
                   handleTitleStudyChange={handleTitleStudyChange}
                   handleStudyStartChange={handleStudyStartChange}
                   handleStudyEndChange={handleStudyEndChange} 
                   handleSubmit={handleSubmit}/>

        <RightArrow handleClick={handleRightArrowClick} form='general-form'/>
    </>
    )
  }
}

export default App;
