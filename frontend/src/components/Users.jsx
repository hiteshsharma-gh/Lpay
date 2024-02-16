import Button from './Button'

function Users(props) {
  const logo = (props.lastname ? props.firstname[0] + props.lastname[0] : props.firstname[0]);

  return (
    <div className='w-full h-14 flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <div className='w-9 h-9 bg-zinc-100 font-medium rounded-full flex justify-center items-center'>{logo}</div>
        <p className='font-semibold text-lg'>{`${props.firstname} ${props.lastname}`}</p>
      </div>
      <div className='w-32 h-fit flex justify-end'>
        <Button text='Send Money' lastName={props.lastname} firstName={props.firstname} id={props.id} />
      </div>
    </div>
  )
}

export default Users
