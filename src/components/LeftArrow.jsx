import { useState } from "react";
import { createPortal } from "react-dom";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";

export function LeftArrow({ title='Move back', handleClick, hasChanged }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='nav-btn left'
                    title={title}
                    onClick={() => {
                        if (hasChanged) {
                            setShowModal(true);
                        } else {
                            handleClick();
                        }
                    }}>
                <img src='assets/9554501_arrow_left_navigation_gps_direction_icon.svg'
                    alt='Move back'>
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