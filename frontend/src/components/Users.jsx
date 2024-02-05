import Button from './Button'

function Users(props) {
  const logo = (props.lastName ? props.firstName[0] + props.lastName[0] : props.firstName[0]);

  return (
    <div className='w-full h-14 px-10 flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <div className='w-9 h-9 bg-zinc-100 font-medium rounded-full flex justify-center items-center'>{logo}</div>
        <p className='font-semibold text-lg'>{`${props.firstName} ${props.lastName}`}</p>
      </div>
      <div className='w-32 h-fit flex justify-end'>
        <Button text='Send Money' />
      </div>
    </div>
  )
}

export default Users
