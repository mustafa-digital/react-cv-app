/*---------------------------------------------------
    REACT CV APP

    RightArrow.jsx
    PURPOSE: Renders RightArrow component
    This component is used to navigate forward
    Opens portal to render UnsavedChangesDialog on document body if hasChanged is true

    PROPS: title: string, handleClick: function, hasChanged: boolean
    STATE: showModal
    RETURNS: RightArrow component
*--------------------------------------------------*/

import { useState } from "react";
import { createPortal } from "react-dom";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";

export function RightArrow({ title='Move next', handleClick, hasChanged}) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button type='submit'
                    className='nav-btn right'
                    title={title}
                    onClick={() => {
                        if (hasChanged) {
                            setShowModal(true);
                        } else {
                            handleClick();
                        }
                    }}>
                    
                <img src='assets/9554506_arrow_right_next_navigation_pointer_icon.svg'
                    alt='Move next'>
                </img>
            </button>
            {showModal && createPortal(
                <UnsavedChangesDialog
                    onClose={() => setShowModal(false)}
                    stayOnPage={() => {
                        setShowModal(false);
                    }}
                    leavePage={() => {
                        setShowModal(false);
                        handleClick();
                    }} />,
                document.body
            )}
        </>
    )
}