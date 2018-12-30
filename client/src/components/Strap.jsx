import React from 'react';

const Strap = props => {
  return (
  <span className="summary-strap-options">
    <img className="summary-strap-image" src={props.strap.strap_image}/>
    <div>+ ${props.strap.strap_price}</div>
    <div>{props.strap.strap_name}</div>
  </span>
  )
}

export default Strap;