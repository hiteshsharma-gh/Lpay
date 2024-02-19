import { useRecoilState } from "recoil"
import Users from "./Users"
import searchUserAtom from "../atoms/searchUser.atom"
import { useEffect, useState } from "react";
import axios from "axios";

function SearchBar() {
  const [searchUser, setSearchUser] = useRecoilState(searchUserAtom)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/user/bulk?filter=${searchUser}`)
      .then((response) => {
        if (response.status == 200)
          setUsers(response.data.users)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/user/bulk?filter=${searchUser}`)
      .then((response) => {
        if (response.status == 200)
          setUsers(response.data.users)
      })
  }, [searchUser])

  function onChange(e) {
    const value = e.target.value
    setSearchUser(value)
  }

  return (
    <div className='w-full h-fit flex justify-center items-start gap-2 flex-col px-10 '>
      <h2 className='font-bold text-2xl pb-3'>Users</h2>
      <input className='w-full h-10 px-3 border border-zinc-400 rounded-md' name='searchUser' onChange={onChange} placeholder='Search users...' value={searchUser}></input>
      {users.map(user => (
        <Users firstname={user.firstName} lastname={user.lastName} key={user._id} id={user._id} />
      ))}
    </div>
  )
}

export default SearchBar
