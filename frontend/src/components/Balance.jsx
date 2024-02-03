function Balance(props) {
  return (
    <div className='w-full h-fit flex justify-start items-start gap-5 p-10 py-6 border-gray-100 border-b-1 '>
      <h2 className='font-bold text-2xl'>Your Balance</h2>
      <p className='font-medium text-2xl'>${props.balance}</p>
    </div>
  )
}

export default Balance
