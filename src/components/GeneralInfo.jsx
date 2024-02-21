export function GeneralInfo({ firstName, 
                              lastName, 
                              email, 
                              phone,
                              handleFirstNameChange, 
                              handleLastNameChange, 
                              handleEmailChange, 
                              handlePhoneChange, 
                              handleSubmit 
                            }) {

    return (
        <section>
            <h1>General Info</h1>
            <form id='general-form' onSubmit={handleSubmit}>
                <div className='name-wrapper'>
                    {/* first name input  */}
                    <label>
                        Name
                        <input type='text'
                               name='first-name'
                               placeholder='First Name'
                               value={firstName}
                               onChange={handleFirstNameChange} 
                               required />
                    </label>
                    {/* last name input  */}
                    <label>
                        <input type='text'
                               name='last-name'
                               placeholder='Last Name'
                               value={lastName}
                               onChange={handleLastNameChange} 
                               required />
                    </label>
                </div>
                
                {/* email address input */}
                <label>
                    Email
                    <input type='email'
                           name='email'
                           placeholder='example@email.com'
                           value={email}
                           onChange={handleEmailChange}
                           required />
                </label>

                {/* phone number input */}
                <label>
                    Phone
                    <input type='tel'
                           name='phone'
                           placeholder='555-555-5555'
                           value={phone}
                           onChange={handlePhoneChange}
                           required 
                           pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'/>
                </label>
            </form>
        </section>
    )
}