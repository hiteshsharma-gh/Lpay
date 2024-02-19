import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import inputBoxAtomFamily from '../atoms/inputBoxAtom.atom.js'

function Button(props) {
  const firstName = useRecoilValue(inputBoxAtomFamily("firstName"))
  const lastName = useRecoilValue(inputBoxAtomFamily("lastName"))
  const email = useRecoilValue(inputBoxAtomFamily("email"))
  const password = useRecoilValue(inputBoxAtomFamily("password"))

  const navigate = useNavigate();

  async function handleClick() {
    if (props.text === "Send Money") {
      navigate(`/send?to=${props.id}&name=${props.firstName + " " + props.lastName}`)
    } else if (props.text === "Sign Up") {
      axios({
        method: "post",
        url: "http://localhost:8080/api/v1/user/signup",
        data: {
          username: email,
          password,
          firstName,
          lastName
        }
      })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("token", "Bearer " + response.data.token)
            navigate("/dashboard")
          }
        })
    } else if (props.text === "Sign In") {
      axios({
        method: "post",
        url: "http://localhost:8080/api/v1/user/signin",
        data: {
          username: email,
          password
        }
      })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("token", "Bearer " + response.data.token)
            navigate("/dashboard")
          }
        })
    }
  }

  return (
    <button onClick={handleClick} className='bg-black h-10 w-11/12 text-white rounded-lg mt-4 mb-3'>{props.text}</button>
  )
}

export default Button
