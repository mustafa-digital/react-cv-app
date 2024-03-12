/*---------------------------------------------------
    REACT CV APP

    EducationUtils.jsx
    PURPOSE: Generates an array of Education Form components based on size of education map

    RETURNS: array of EducationForm components
*--------------------------------------------------*/

import { EducationForm } from "../components/EducationForm";

// Creates EducationForm components based on education size, and pushes them unto eduForms array
export function getEduForms(props) {
  let eduForms = [];
  for (let i = 0; i < props.education.size; i++) {
    eduForms.push(<EducationForm index={i} {...props} />);
  }
  return eduForms;
}
