export function InvalidForms({ generalInfo, education, work, handlePageChange}) {

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
                    <img style={imageStyle} src='src/assets/alert-box.svg' alt='alert-icon' />
                </p>
                {/* <button className='review-button-invalid' onClick={() => handlePageChange(page)} >Edit</button> */}
            </div>
        )
    }

    const GENERAL_INFO = 1;
    const EDUCATION = 2;
    const WORK = 3; 

    return (
        <section className="section-border warning-section">
            <h3>Some of the information is incomplete. Please re-check the forms by clicking the links.</h3>
            {!generalInfo.isValid && 
                <Warning formName={'General Info'} page={GENERAL_INFO} />
            }

            {education.size > 0 && !education.isValid && 
                <Warning formName={'Education'} page={EDUCATION} />
            }

            {work.size > 0 && !work.isValid && 
                <Warning formName={'Work'} page={WORK} />
            }
        </section>
    )
}

