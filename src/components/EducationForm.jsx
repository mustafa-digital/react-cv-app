/*---------------------------------------------------
    REACT CV APP

    EducationForm.jsx
    PURPOSE: Renders an education form, input values and handlers from props
    renders some components conditionally based on review prop, false by default

    PROPS: educationProps, review: boolean
    RETURNS: EducationForm component
*--------------------------------------------------*/

import { ErrorMessage } from "./ErrorMessage";

export function EducationForm({
  index,
  education,
  handleEducationInput,
  handleSubmit,
  formEditingHandler,
  handleClose,
  handleFormChange,
  handlePageChange,
  review = false,
}) {
  // get the education form values at index
  const edu = education.get(index);
  const schoolName = edu.name;
  const degree = edu.degree;
  const titleStudy = edu.title;
  const studyStart = edu.start;
  const studyEnd = edu.end;
  const EDU_PAGE = 2;
  return (
    <>
      {!review && (
        <button className="close-button" type="button" onClick={handleClose}>
          &times;
        </button>
      )}
      <form
        id="education-form"
        className="section-border"
        onSubmit={handleSubmit}
        onClick={formEditingHandler}
        onInput={handleFormChange}
        data-index={index}
        noValidate
      >
        {/* school name input  */}
        <label>
          {" "}
          College Name
          {!schoolName.isValid && <ErrorMessage message={schoolName.message} />}
          <input
            type="text"
            name="school-name"
            placeholder=""
            defaultValue={schoolName.value}
            onChange={(e) => handleEducationInput(e, "name")}
            disabled={review}
            required
          />
        </label>

        <div className="degree-wrapper">
          {/* degree type selection */}
          <label>
            {" "}
            Degree
            {!degree.isValid && <ErrorMessage message={degree.message} />}
            <select
              name="degree"
              id="degree-select"
              defaultValue={degree.value}
              onChange={(e) => handleEducationInput(e, "degree")}
              className={degree.value ? "valid" : ""}
              disabled={review}
              required
            >
              <option value="">Choose your degree</option>
              <option value="AA">Associate of Arts</option>
              <option value="AS">Associate of Science</option>
              <option value="AAS">Associate of Applied Sciences</option>
              <option value="AGS">Associate of General Studies</option>
              <option value="BSc">Bachelor of Science</option>
              <option value="BFA">Bachelor of Fine Arts</option>
              <option value="BEd">Bachelor of Education</option>
              <option value="BEng">Bachelor of Engineering</option>
              <option value="BCom">Bachelor of Commerce</option>
              <option value="MA">Master of Arts</option>
              <option value="MSc">Master of Science</option>
              <option value="MEd">Master of Education</option>
              <option value="Phd">Doctor of Philosophy</option>
              <option value="MD">Doctor of Medicine</option>
            </select>
          </label>

          {/* title of study input */}
          <label>
            {" "}
            Title of Study
            {!titleStudy.isValid && (
              <ErrorMessage message={titleStudy.message} />
            )}
            <input
              type="text"
              name="title-study"
              placeholder=""
              defaultValue={titleStudy.value}
              onChange={(e) => handleEducationInput(e, "title")}
              disabled={review}
              required
            />
          </label>
        </div>

        {/* date of study input */}
        <div>
          <label htmlFor="date-study-start" className="date-study-lbl">
            Date of Study
            {!studyStart.isValid && (
              <ErrorMessage message={studyStart.message} />
            )}
          </label>

          <div className="date-inputs-wrapper">
            <input
              type="date"
              name="date-study-start"
              id="date-study-start"
              placeholder=""
              defaultValue={studyStart.value}
              onChange={(e) => handleEducationInput(e, "start")}
              disabled={review}
              required
            />
            <span> to </span>
            <input
              type="date"
              name="date-study-end"
              placeholder=""
              defaultValue={studyEnd.value}
              onChange={(e) => handleEducationInput(e, "end")}
              className={studyEnd.value ? "" : "empty-date"}
              disabled={review}
            />
          </div>
        </div>
        {review ? (
          <button
            type="button"
            onClick={() => handlePageChange(EDU_PAGE)}
            className="edit-button"
          >
            Change
          </button>
        ) : (
          <button type="submit" className="save-button">
            Save
          </button>
        )}
      </form>
    </>
  );
}
