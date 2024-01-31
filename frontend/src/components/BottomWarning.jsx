import { useNavigate } from 'react-router-dom'

function BottomWarning(props) {
  const navigate = useNavigate();

  function handleClick() {
    const link = props.link
    if (link == 'Sign Up') {
      navigate('/signin')
    } else {
      navigate('/signup')
    }
  }

  return (
    <div className='flex gap-1 mb-5 font-medium text-sm'>
      <p>{props.text}</p>
      <span className='underline' onClick={handleClick}>{props.link}</span>
    </div>
  )
}

export default BottomWarning
