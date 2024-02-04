import { useNavigate } from 'react-router-dom'

function Button(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/dashboard')
  }

  return (
    <button onClick={handleClick} className='bg-black h-10 w-11/12 text-white rounded-lg mt-4 mb-3'>{props.text}</button>
  )
}

export default Button
