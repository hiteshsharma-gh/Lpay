import { useRecoilState } from "recoil"
import searchUserAtom from "../atoms/searchUser.atom"

function SearchBar() {
  const [searchUser, setSearchUser] = useRecoilState(searchUserAtom)

  function onChange(e) {
    const value = e.target.value
    setSearchUser(value)
  }

  return (
    <div className='w-full h-fit flex justify-center items-start gap-4 flex-col px-10 pb-5'>
      <h2 className='font-bold text-2xl'>Users</h2>
      <input className='w-full h-10 px-3 border border-zinc-400 rounded-md' name='searchUser' onChange={onChange} placeholder='Search users...' value={searchUser}></input>
    </div>
  )
}

export default SearchBar
