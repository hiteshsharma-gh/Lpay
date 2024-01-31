import { useRecoilState } from 'recoil'
import inputBoxAtomFamily from '../atoms/inputBoxAtom.atom'

function InputBox(props) {
  const [inputValue, setInputValue] = useRecoilState(inputBoxAtomFamily(props.id))

  function handleChange(e) {
    const value = e.target.value
    setInputValue(value)
  }

  return (
    <div className='flex flex-col w-full pt-4 px-4'>
      <label className='pb-2 font-semibold text-sm' htmlFor={props.id}>{props.label}</label>
      <input value={inputValue} onChange={handleChange} autoComplete='off' className='h-10 border border-gray-200 rounded-l-md px-2 text-sm placeholder-neutral-400' id={props.id} name={props.id} placeholder={props.placeholder} type={props.id == 'password' ? 'password' : 'text'}></input>
    </div>
  )
}

export default InputBox
