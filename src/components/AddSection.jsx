/*---------------------------------------------------
    REACT CV APP

    AddSectionjsx
    PURPOSE: Renders the "add new form" section for work and education pages

    PROPS: sectionName: string, handleClick: function
    RETURNS: AddSection component
*--------------------------------------------------*/

export function AddSection({ sectionName, handleClick }) {
  return (
    <section className="section-border add-section-wrapper">
      <div className="add-section">
        <button className="add-section-btn" onClick={handleClick}>
          <img
            src="assets/plus-box.svg"
            alt={`Add ${sectionName} information button`}
          ></img>
        </button>
        <h2 className="add-section-text">{`Add ${sectionName}`}</h2>
      </div>
    </section>
  );
}
