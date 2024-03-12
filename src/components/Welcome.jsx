/*---------------------------------------------------
    REACT CV APP

    Welcome.jsx
    PURPOSE: Renders the Welcome page 

    PROPS:
    RETURNS: Welcome component
*--------------------------------------------------*/

export function Welcome() {
    return (
        <section className="content">
            <h1>Welcome</h1>
            <div className='section-border'>
                <p>Thank you for your interest in applying for this position.</p>
                <p>To navigate, press the arrows on the sides.</p>
                <p style={{color: 'blue'}}>Let&#39;s get started.</p>
            </div>
        </section>
    )
}