import { useRecoilState } from "recoil"
import Users from "./Users"
import searchUserAtom from "../atoms/searchUser.atom"
import { useEffect } from "react";
import axios from "axios";

function SearchBar() {
  const [searchUser, setSearchUser] = useRecoilState(searchUserAtom)

  let users = [];
  useEffect(() => {
    const count = setTimeout(() => {
      axios.get(process.env.SERVER_API_URI + `/bulk?filter=${searchUser}`)
        .then((response) => {
          users = response.data
        })
    }, 200)

    return clearTimeout(count)
  }, [searchUser])

  function onChange(e) {
    const value = e.target.value
    setSearchUser(value)
  }

  return (
    <div className='w-full h-fit flex justify-center items-start gap-2 flex-col px-10 '>
      <h2 className='font-bold text-2xl pb-5'>Users</h2>
      <input className='w-full h-10 px-3 border border-zinc-400 rounded-md' name='searchUser' onChange={onChange} placeholder='Search users...' value={searchUser}></input>
      {users.map((user) => {
        <Users firstName={user.firstName} lastName={user.lastName} />
      })}
    </div>
  )
}

export default SearchBar
