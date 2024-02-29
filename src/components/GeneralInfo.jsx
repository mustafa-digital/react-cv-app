import { ErrorMessage } from "./ErrorMessage";

export function GeneralInfo({ firstName, 
                              lastName, 
                              email, 
                              phone,
                              handleFirstNameChange, 
                              handleLastNameChange, 
                              handleEmailChange, 
                              handlePhoneChange, 
                              handleSubmit,
                              handleFormChange
                            }) {

    return (
        <section>
            <h1>General Information</h1>
            <form id='general-form' 
                  onSubmit={handleSubmit}
                  onInput={handleFormChange}
                  noValidate >
                <div className='name-wrapper'>
                    {/* first name input  */}
                    <label>
                        Name
                        {!firstName.isValid && <ErrorMessage message={firstName.message}/>}
                        <input type='text'
                                name='first-name'
                                placeholder='First Name' 
                                defaultValue={firstName.value}
                                onChange={handleFirstNameChange}  
                                required />

                    </label>
                    {/* last name input  */}
                    <label>
                        &nbsp;
                        {!lastName.isValid && <ErrorMessage message={lastName.message}/>}
                        <input type='text'
                               name='last-name' 
                               placeholder='Last Name' 
                               defaultValue={lastName.value}
                               onChange={handleLastNameChange}
                               required />
                    </label>
                </div>
                
                {/* email address input */}
                <label>
                    Email
                    {!email.isValid && <ErrorMessage message={email.message}/>}
                    <input type='email'
                           name='email'
                           placeholder='example@email.com' 
                           defaultValue={email.value}
                           onChange={handleEmailChange} 
                           required />
                </label>

                {/* phone number input */}
                <label>
                {!phone.isValid && <ErrorMessage message={phone.message}/>}
                    Phone
                    <input type='tel'
                           name='phone'
                           placeholder='555-555-5555'
                           defaultValue={phone.value}
                           onChange={handlePhoneChange}
                           pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' 
                           required />
                </label>
                <button type='submit' className='save-button'>Save</button>
            </form>
        </section>
    )
}