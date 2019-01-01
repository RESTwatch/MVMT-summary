import React from 'react';

const Strap = props => {
  const isSelected = props.strap.isSelected;
  const handleClick = () => props.clickHandler(props.strap.index);
  return (
    <span className="summary-strap-options" onClick={handleClick}>
      <img className="summary-strap-image" src={props.strap.strap_image}/>
      <div className="summary-strap-price">+ ${props.strap.strap_price}</div>
      <div className="summary-strap-name">{props.strap.strap_name}</div>
      <div className="summary-strap-checkbox"></div>
    </span>
  )
}

export default Strap;