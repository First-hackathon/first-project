import React from "react"
import { Url } from "../model/utils"

type SupporterType = {
  thumbnail: Url
  name: string
  date: Date
}

const Supporter: React.VFC<SupporterType> = ({ thumbnail, date, name }: SupporterType) => {
  return (
    <li className="flex">
      <img src={thumbnail} alt={name} />
      <p>{name}</p>
      <p>{date}</p>
    </li>
  )
}

type Props = SupporterType[]
export const SupportersList: React.VFC<Props> = (users: Props) => {
  return (
    <>
      <h3>応援してくれた人</h3>
      <ul>
        {users.map((user, i) => (
          <Supporter thumbnail={user.thumbnail} name={user.name} date={user.date} key={i} />
        ))}
      </ul>
      <strong>合計{users.length}人</strong>
    </>
  )
}
