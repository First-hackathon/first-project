import React from "react"
import { Url } from "../../model/utils"
import { SupportersList } from "../../components/SupportersList"

type SupporterType = {
  thumbnail: Url
  name: string
  date: Date
}

export const SupporterMock: SupporterType[] = [
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "ゆうすけ",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "中島",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "田川",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "渡部",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "岡本",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "tagawa yusuke",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "sota watanabe",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "yuki okamoto",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "yusuke tagawa",
    date: new Date()
  },
  {
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/stickers-hackathon.appspot.com/o/images%2F150x150.png?alt=media&token=9a93007e-2b48-4974-b7f8-879e96f8faa7",
    name: "tagawa",
    date: new Date()
  }
]

const Index: React.VFC = () => {
  return (
    <div className="px-10 pt-10">
      <SupportersList users={SupporterMock} />
    </div>
  )
}
export default Index
