import React from 'react';
import Strap from './Strap.jsx';

const StrapLoader = props => {
  const hasStraps = props.hasStraps;
  return (
    <div>
      { hasStraps ?
        <div className="summary-strap-container">
          <span id="summary-strap-number">ADD A SECOND STRAP</span>
          <span id="summary-strap-guide">STRAP GUIDE</span>
          <div>
            {props.strapSpec.map(strap => {
              return <Strap strap={strap} key={strap.strap_id}/>
            })}
          </div> 
        </div> :
        <div>No straps</div>
    }
    </div>
  )
}

export default StrapLoader;