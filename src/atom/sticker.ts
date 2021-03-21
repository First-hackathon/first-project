import { atom } from "recoil"

export const stickerState = atom<string>({
  key: "stickerState",
  default: ""
})
