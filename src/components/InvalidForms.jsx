/*---------------------------------------------------
    REACT CV APP

    InvalidForms.jsx
    PURPOSE: Renders the Invalid Forms component in Review page, when not all forms are valid
    Tells the user which forms are not valid
    contains child component Warning which renders a paragraph based on which form is invalid

    PROPS: generalIsValid, educationIsValid, workIsValid: boolean, handlePageChange: function
    RETURNS: InvalidForms component
*--------------------------------------------------*/

export function InvalidForms({ generalIsValid, educationIsValid, workIsValid, handlePageChange}) {

    // alert image style
    const imageStyle = {
        width: '32px',
        marginLeft: '20px'
    }

    /*
      Child component that renders a warning paragraph, given a formName, and page number 
    */
    const Warning = ({formName, page}) => {
        return (
            <div className="form-invalid-warning">
                <p> 
                    <span className="form-invalid-span" onClick={() => handlePageChange(page)} title={'Go to page'}>
                    {formName}
                    </span>&nbsp;form is incomplete.
                    <img style={imageStyle} src='assets/alert-box.svg' alt='alert-icon' />
                </p>
                {/* <button className='review-button-invalid' onClick={() => handlePageChange(page)} >Edit</button> */}
            </div>
        )
    }

    // page status numbers
    const GENERAL_INFO = 1;
    const EDUCATION = 2;
    const WORK = 3; 

    return (
        <div className="section-border">
            <h3>Some of the information is incomplete. Please re-check the forms by clicking the links.</h3>
            {/* Conditionally render section based on the according invalid form */}
            {!generalIsValid && 
                <Warning formName={'General Info'} page={GENERAL_INFO} />
            }

            {!educationIsValid && 
                <Warning formName={'Education'} page={EDUCATION} />
            }

            {!workIsValid && 
                <Warning formName={'Work'} page={WORK} />
            }
        </div>
    )
}

