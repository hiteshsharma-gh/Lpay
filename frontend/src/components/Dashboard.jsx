import axios from "axios"
import Balance from "./Balance"
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"

function Dashboard() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/v1/account/balance",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        if (response.status == 200) {
          setBalance(response.data.balance)
        }
      })
  }, [])

  return (
    <div>
      <Navbar heading='Light Pay' firstName='User' lastName='' greating='Hello' />
      <Balance balance={balance} />
      <SearchBar />
    </div>
  )
}

export default Dashboard
