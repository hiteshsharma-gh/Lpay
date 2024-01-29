import React from 'react'

function BottomWarning(props) {
  return (
    <div className='flex gap-1 mb-5 font-medium text-sm'>
      <p>{props.text}</p>
      <p className='underline'>{props.link}</p>
    </div>
  )
}

export default BottomWarning
