import { useState } from "react";
import { createPortal } from "react-dom";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";

export function RightArrow({ title='Move next', handleClick, hasChanged}) {
    const [showModal, setShowModal] = useState(false);
    const [leavePage, setLeavePage] = useState(false);

    if (leavePage) {
        handleClick();
        setLeavePage(false);
    }
    return (
        <>
            <button type='submit'
                    className='nav-btn right'
                    title={title}
                    onClick={() => {
                        if (hasChanged && !leavePage) {
                            setShowModal(true);
                        } else {
                            handleClick();
                            setLeavePage(false);
                        }
                    }}>
                    
                <img src='src/assets/9554506_arrow_right_next_navigation_pointer_icon.svg'
                    alt='Move next'>
                </img>
            </button>
            {showModal && createPortal(
                <UnsavedChangesDialog
                    onClose={() => setShowModal(false)}
                    stayOnPage={() => {
                        setLeavePage(false);
                        setShowModal(false);
                    }}
                    leavePage={() => {
                        setLeavePage(true);
                        setShowModal(false);
                    }} />,
                document.body
            )}
        </>
    )
}