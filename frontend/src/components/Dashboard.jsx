import Balance from "./Balance"
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"

function Dashboard() {
  return (
    <div>
      <Navbar heading='Light Pay' firstName='User' greating='Hello, User' />
      <Balance balance='5000' />
      <SearchBar />
    </div>
  )
}

export default Dashboard
