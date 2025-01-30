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