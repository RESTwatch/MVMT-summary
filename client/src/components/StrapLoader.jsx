import React from 'react';
import Strap from './Strap.jsx';

const StrapLoader = props => {
  const hasStraps = props.hasStraps;
  return (
    <div>
      { hasStraps ?
        <div>
          <div>ADD A SECOND STRAP</div>
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