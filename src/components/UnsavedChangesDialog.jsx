export function UnsavedChangesDialog({ stayOnPage, leavePage }) {
    return (
        <div className='modal-backdrop'>
            <div className='warning-dialog'>
                <p><span>Warning: </span>you have unsaved changes on this page.</p>
                <button onClick={stayOnPage}>Stay on this page</button>
                <button onClick={leavePage}>Leave this page</button>
            </div>
        </div>
    )
}