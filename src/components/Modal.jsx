function Modal({heading, btnText, onClick, children}) {
  return (
    <div className='modal'>
      <div className='modal-menu'>
        <h1>{heading}</h1>
          {children}
        <button onClick={onClick}>{btnText}</button>
      </div>
    </div>
  )
}

export default Modal;