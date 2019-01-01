import React from 'react';

const SelectedStrapNames = props => {
  return (
    <span>{props.names.map(name => (
      <span key={name} className="summary-selected-strap-names">+ {name} strap</span>
    ))}</span>
  )
}

export default SelectedStrapNames;