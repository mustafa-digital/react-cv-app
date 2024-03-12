/*---------------------------------------------------
    REACT CV APP

    ErrorMessage.jsx
    PURPOSE: Renders the 'invalid input' error message in a form

    PROPS: message: string
    RETURNS: ErrorMessage component
*--------------------------------------------------*/

export function ErrorMessage({ message }) {
  return (
    <>
      <p className="error-message">{"* " + message}</p>
    </>
  );
}
