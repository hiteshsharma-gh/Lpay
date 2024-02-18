import { useRecoilState } from "recoil"
import amountAtom from "../atoms/amount.atom.js"
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";

function Send() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const to = searchParams.get("to")
  const name = searchParams.get("name")

  const logo = useMemo(() => {
    return name.split(" ")[0][0] + name.split(" ")[1][0];
  }, [name]);

  const [amount, setAmount] = useRecoilState(amountAtom)

  function handleChange(e) {
    const value = e.target.value;
    const money = parseInt(value)
    setAmount(money)
  }

  function handleClick() {
    axios({
      method: "post",
      url: "http://localhost:8080/api/v1/account/transfer",
      data: {
        to,
        amount
      },
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        if (response.status == 200) {
          console.log(response)
          navigate("/dashboard")
        }
      })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col h-fit w-fit rounded-lg shadow-lg shadow-gray-700/50 justify-center items-center p-7">
        <h1 className="font-bold text-4xl pb-12">Send Money</h1>
        <div className="flex justify-start gap-4 pb-4 items-center self-start">
          <div className="rounded-full w-11 h-11 text-3xl text-white font-medium bg-green-500 flex justify-center items-center">{logo}</div>
          <h2 className="text-3xl font-semibold">{name}</h2>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 p-0 mb-5">
          <label className="font-medium" htmlFor="Amount">Amount (in Rs)</label>
          <input className="h-9 w-96 p-3 rounded-md border-zinc-500 border" id="Amount" name="Amount" placeholder="Enter amount" value={amount} onChange={handleChange}></input>
        </div>
        <button className="w-96 h-9 rounded-md bg-green-500 text-white" onClick={handleClick}>Initiate Transfer</button>
      </div>
    </div>
  )
}

export default Send
