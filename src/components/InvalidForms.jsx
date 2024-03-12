export function InvalidForms({ generalIsValid, educationIsValid, workIsValid, handlePageChange}) {

    const imageStyle = {
        width: '32px',
        marginLeft: '20px'
    }

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

    const GENERAL_INFO = 1;
    const EDUCATION = 2;
    const WORK = 3; 

    return (
        <div className="section-border">
            <h3>Some of the information is incomplete. Please re-check the forms by clicking the links.</h3>
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

