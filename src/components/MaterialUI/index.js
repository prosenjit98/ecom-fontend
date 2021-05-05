import React, { useState } from 'react'
import './style.css'

const Modal = (props) => {

  if (!props.visible) {
    return null;
  }

  return (
    <>
      <div className='modalFixedBg'>
        <div style={{ position: 'relative' }}>
          <div className="modalClose" onClick={props.onClose}>X</div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>

  )
}

const MaterialInput = props => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="materialInput">
      <label className={`label ${focus ? 'focus' : ''}`} style={{ top: 0, lineHeight: 'none' }}>
        {props.label}
      </label>
      <div style={{ display: 'flex' }}>
        <input className='input' type={props.type} value={props.value} onChange={props.onChange}
          onFocus={() => setFocus(true)} onBlur={(e) => {
            if (e.target.value === '') {
              setFocus(false)
            }
          }} />
        {
          props.rightElement ? props.rightElement : null
        }
      </div>
    </div>
  )
}

const MaterialButton = props => {
  const onClick = () => {
    props.onClick && props.onClick()
  }
  return (
    <div style={{ width: '90%', backgroundColor: props.bgColor, color: props.textColor, ...props.style }}>
      <button className="materialButton"
        style={{ backgroundColor: props.bgColor, color: props.textColor }}
        onClick={onClick}>
        {props.icon && props.icon}
        {props.title && props.title}
      </button>
    </div>
  )
}

const MaterialDropdown = props => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrow"></div>
        {props.firstMenu}
        <ul className="hearderDropdownMenu">
          {props.menus && props.menus.map((item, index) =>
            <li key={index} ><a href={`${item.href}`} onClick={e => {
              e.preventDefault();
              item.onClick && item.onClick()
              if (item.href) { window.location.href = item.href }
            }}>{item.label}</a></li>)}
        </ul>
      </div>
    </div>
  )
}

const Anchor = (props) => {
  return <button {...props} className="anchorButton">
    {props.name}
  </button>
}

const Bread = props => {
  return (
    <div className="breed">
      <ul>
        {props.bread && props.bread.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.name}</a>
            {(props.bread.length - 1 !== index) && props.breadIcon}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Modal, MaterialInput, MaterialDropdown, MaterialButton, Anchor, Bread }
