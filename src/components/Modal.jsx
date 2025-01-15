function Modal({heading, btnText, btnHandler, children}) {
  return (
    <div className='modal'>
      <div className='modal-menu'>
        <h1>{heading}</h1>
          {children}
        <button onClick={btnHandler}>{btnText}</button>
      </div>
    </div>
  )
}

export default Modal;