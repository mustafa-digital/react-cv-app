/*---------------------------------------------------
    REACT CV APP

    Hello, this is a job application app.
    Navigate the site using the left and right arrow buttons.
    Enter and save your information in the forms and review information once completed.
   
    AUTHOR: MUSTAFA ATOOF
    GITHUB: https://github.com/mustafa-digital/react-cv-app
    Live page: https://vercel.com/mustafa-digitals-projects/react-cv-app
*--------------------------------------------------*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx';
import './styles/reset.css';
import './styles/style.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
