import { useNavigate } from 'react-router-dom'

function BottomWarning(props) {
  const navigate = useNavigate();

  function handleClick() {
    const link = props.link
    if (link == 'Sign Up') {
      navigate('/signup')
    } else {
      navigate('/signin')
    }
  }

  return (
    <div className='flex gap-1 mb-5 font-medium text-sm'>
      <p>{props.text}</p>
      <button className='underline' onClick={handleClick}>{props.link}</button>
    </div>
  )
}

export default BottomWarning
