import React from 'react';

const Strap = props => {
  return (
  <div>
    <img src={props.strap.strap_image}/>
    <div>+ ${props.strap.strap_price}</div>
    <div>{props.strap.strap_name}</div>
  </div>
  )
}

export default Strap;