import React from 'react'

function InputBox(props) {
  return (
    <div className='flex flex-col w-full pt-4 px-4'>
      <label className='pb-2 font-semibold text-sm' htmlFor={props.id}>{props.label}</label>
      <input className='h-10 border border-gray-200 rounded-l-md px-2 text-sm text-neutral-400' id={props.id} name={props.id} placeholder={props.placeholder}></input>
    </div>
  )
}

export default InputBox
