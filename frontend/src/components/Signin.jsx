import Heading from './Heading'
import SubHeading from './SubHeading'
import InputBox from './InputBox'
import Button from './Button'
import BottomWarning from './BottomWarning'

function Singin() {
  return (
    <div className='h-screen w-full bg-zinc-500 flex justify-center items-center '>
      <div className='bg-white h-fit w-96 rounded-xl flex flex-col items-center px-0 py-0'>
        <Heading heading="Sign In" />
        <SubHeading subheading="Enter your credentials to access you account" />
        <InputBox id="email" label="Email" placeholder="johndoe@example.com" />
        <InputBox id="password" label="Password" placeholder="" />
        <Button text="Sign In" />
        <BottomWarning text="Don't have an account?" link="Sign Up" />
      </div>
    </div>
  )
}

export default Singin
