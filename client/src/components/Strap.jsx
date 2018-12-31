import React from 'react';

const Strap = props => {
  return (
    <span className="summary-strap-options">
      <img className="summary-strap-image" src={props.strap.strap_image}/>
      <div className="summary-strap-price">+ ${props.strap.strap_price}</div>
      <div className="summary-strap-name">{props.strap.strap_name}</div>
      <div className="summary-strap-checkbox"></div>
    </span>
  )
}

export default Strap;