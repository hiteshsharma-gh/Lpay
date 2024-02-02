function Navbar(props) {
  const logo = props.firstName[0];

  return (
    <header className='sticky top-0 z-50 bg-white w-screen h-fit flex justify-between border-gray-100 border-b px-10 py-6'>
      <h1 className='font-bold text-4xl '>{props.heading}</h1>
      <div className='flex gap-3 justify-center items-center'>
        <h3 className='font-medium text-lg'>{props.greating}</h3>
        <button className='bg-zinc-100 w-9 h-9 text-lg rounded-full flex justify-center items-center'>{logo}</button>
      </div>
    </header >
  )
}

export default Navbar
