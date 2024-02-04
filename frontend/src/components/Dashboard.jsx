import Balance from "./Balance"
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"
import Users from "./Users"

function Dashboard() {
  return (
    <div>
      <Navbar heading='Light Pay' firstName='User' lastName='User' greating='Hello, User' />
      <Balance balance='5000' />
      <SearchBar />
      <Users />
    </div>
  )
}

export default Dashboard
