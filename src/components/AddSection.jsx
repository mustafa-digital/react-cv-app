export function AddSection({ sectionName, handleClick }) {
    return (
        <section className="section-border">
            <button className='add-section-btn'
                    onClick={handleClick}>
                <img src='src/assets/plus-box.svg' alt={`Add ${sectionName} information button`}></img>
            </button>
            <h2 className='add-section-text'>Add Education</h2>
        </section>
    )
}