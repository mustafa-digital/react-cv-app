/*---------------------------------------------------
    REACT CV APP

    UnsavedChangesDialog.jsx
    PURPOSE: Tells user they have unsaved changes and asks them if they want to leave
    Gives option to stay on page, or leave, if user clicks leave page, changes are lost

    PROPS: stayOnPage: function, leavePage: function
    RETURNS: UnsavedChangesDialog component
*--------------------------------------------------*/

export function UnsavedChangesDialog({ stayOnPage, leavePage }) {
    return (
        <div className='modal-backdrop'>
            <div className='warning-dialog'>
                <h2 style={{fontWeight:'bold'}}>Are you sure you want to leave this page?</h2>
                <p><span>Warning: </span>you have unsaved changes on this page. Are you sure you want to leave this page?</p>
                <div className="dialog-buttons">
                    <button className='stay-btn' onClick={stayOnPage}>Stay on this page</button>
                    <button className='leave-btn' onClick={leavePage}>Leave this page</button>
                </div>
            </div>
        </div>
    )
}