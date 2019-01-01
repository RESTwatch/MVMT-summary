import React from 'react';
import Strap from './Strap.jsx';
import StrapGuide from './StrapGuide.jsx';

const StrapLoader = props => {
  const hasStraps = props.hasStraps;
  return (
    <div>
      { hasStraps ?
        <div className="summary-strap-container">
          <div className="summary-strap-title">
            <span id="summary-strap-number">ADD A STRAP</span>
            <StrapGuide/>
          </div>
          <div className="summary-strap-options-container">
            {props.strapSpec.map(strap => {
              return <Strap strap={strap} key={strap.strap_id} clickHandler={props.clickHandler}/>
            })}
          </div> 
        </div> :
        <div></div>
    }
    </div>
  )
}

export default StrapLoader;