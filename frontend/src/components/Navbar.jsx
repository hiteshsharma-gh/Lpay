function Navbar(props) {
  const logo = props.firstName[0];

  return (
    <div className='w-screen h-fit flex justify-between border-gray-100 border-b-2 px-10 py-6'>
      <h1 className='font-bold text-4xl '>{props.heading}</h1>
      <div className='flex gap-3 justify-center items-center'>
        <h3 className='font-medium text-lg'>{props.greating}</h3>
        <button className='bg-zinc-100 w-9 h-9 text-lg rounded-full flex justify-center items-center'>{logo}</button>
      </div>
    </div >
  )
}

export default Navbar
