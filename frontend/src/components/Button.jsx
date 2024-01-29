import React from 'react'

function Button(props) {
  return (
    <button className='bg-black h-10 w-11/12 text-white rounded-lg mt-4 mb-3'>{props.text}</button>
  )
}

export default Button
