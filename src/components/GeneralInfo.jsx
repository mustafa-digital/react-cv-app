import { ErrorMessage } from "./ErrorMessage";

export function GeneralInfo({ generalInfo,
                              handleFirstNameChange, 
                              handleLastNameChange, 
                              handleEmailChange, 
                              handlePhoneChange, 
                              handleSubmit,
                              handleFormChange,
                              review = false,
                              handlePageChange
                            }) {

    const GENERAL_INFO = 1;

    return (
        <section className="content">
            {!review && <h1>General Information</h1>}
            <form id='general-form'
                  className="section-border" 
                  onSubmit={handleSubmit}
                  onInput={handleFormChange}
                  noValidate >
                <div className='name-wrapper'>
                    {/* first name input  */}
                    <label>
                        Name
                        {!generalInfo.firstName.isValid && <ErrorMessage message={generalInfo.firstName.message}/>}
                        <input type='text'
                                name='first-name'
                                placeholder='First Name' 
                                defaultValue={generalInfo.firstName.value}
                                onChange={handleFirstNameChange}
                                disabled={review}  
                                required />

                    </label>
                    {/* last name input  */}
                    <label>
                        &nbsp;
                        {!generalInfo.lastName.isValid && <ErrorMessage message={generalInfo.lastName.message}/>}
                        <input type='text'
                               name='last-name' 
                               placeholder='Last Name' 
                               defaultValue={generalInfo.lastName.value}
                               onChange={handleLastNameChange}
                               disabled={review} 
                               required />
                    </label>
                </div>
                
                {/* email address input */}
                <label>
                    Email
                    {!generalInfo.email.isValid && <ErrorMessage message={generalInfo.email.message}/>}
                    <input type='email'
                           name='email'
                           placeholder='example@email.com' 
                           defaultValue={generalInfo.email.value}
                           onChange={handleEmailChange} 
                           disabled={review} 
                           required />
                </label>

                {/* phone number input */}
                <label>
                {!generalInfo.phone.isValid && <ErrorMessage message={generalInfo.phone.message}/>}
                    Phone
                    <input type='tel'
                           name='phone'
                           placeholder='555-555-5555'
                           defaultValue={generalInfo.phone.value}
                           onChange={handlePhoneChange}
                           pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                           disabled={review}  
                           required />
                </label>
                {review ? <button type='button' onClick={() => handlePageChange(GENERAL_INFO)} className='edit-button'>Change</button> : 
                    <button type='submit' className='save-button'>Save</button>}
            </form>
        </section>
    )
}