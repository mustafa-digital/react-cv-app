/*---------------------------------------------------
    REACT CV APP

    WorkUtils.jsx
    PURPOSE: Generates an array of Work Form components based on size of work map

    RETURNS: array of WorkForm components
*--------------------------------------------------*/

import { WorkForm } from "../components/WorkForm";

// Creates WorkForm components based on work number, and pushes them into workForms array
export function getWorkForms(props) {
  let workForms = [];
  for (let i = 0; i < props.work.size; i++) {
    workForms.push(<WorkForm index={i} {...props} />);
  }
  return workForms;
}
