/**
 * Modal component that displays a heading, content and button.
 * @component
 * @param {Object} props - Component props
 * @param {String} props.heading - String for modal heading
 * @param {String} props.btnText - String for button text
 * @param {Function} props.onClick - Function to handle button click
 * @param {React.ReactNode} props.children - JSX content to be displayed inside modal
 */
function Modal({heading, btnText, onClick, children}) {
  return (
    <div className='modal'>
      <div className='modal-menu'>
        <h1 className="modal-heading">{heading}</h1>
          {children}
        <button className="modal-btn" onClick={onClick}>{btnText}</button>
      </div>
    </div>
  )
}

export default Modal;