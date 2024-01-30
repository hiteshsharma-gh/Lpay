import React from 'react'
import Heading from './Heading'
import SubHeading from './SubHeading'
import InputBox from './InputBox'
import Button from './Button.jsx'
import BottomWarning from './BottomWarning.jsx'

function Signup() {
  return (
    <div className='h-screen w-full bg-zinc-500 flex justify-center items-center '>
      <div className='bg-white h-fit w-[22rem] rounded-xl flex flex-col items-center px-0 py-0'>
        <Heading heading="Sign Up" />
        <SubHeading subheading="Enter your information to create an account" />
        <InputBox id='firstname' label='First Name' placeholder='John' />
        <InputBox id='lastname' label='Last Name' placeholder='Doe' />
        <InputBox id='email' label='Email' placeholder='johndoe@example.com' />
        <InputBox id='password' label='Password' placeholder='' />
        <Button text='Sign Up' />
        <BottomWarning text='Already have an account? ' link='Login' />
      </div>
    </div>
  )
}

export default Signup
