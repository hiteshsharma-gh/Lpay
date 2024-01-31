import { atomFamily } from "recoil";

const inputBoxAtomFamily = atomFamily({
  key: "inputBoxAtom",
  default: ""
})

export default inputBoxAtomFamily
