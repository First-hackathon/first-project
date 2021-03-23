import { atom } from "recoil"

export const stickerState = atom<string>({
  key: "stickerState",
  default: ""
})

export const stickerIsCircleState = atom<boolean>({
  key: "stickerIsCircleState",
  default: false
})
