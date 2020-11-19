import React from 'react'

export const MultiSelect = props => {
    return (
      <>
       <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </>
    )
}

export default MultiSelect