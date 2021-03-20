import React from "react"
import { Url } from "../model/utils"

type SupporterType = {
  thumbnail: Url
  name: string
  date: Date
}

const Supporter: React.VFC<SupporterType> = ({ thumbnail, date, name }: SupporterType) => {
  const dateValue =
    date.getFullYear() +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2)
  return (
    <li className="flex align-middle h-16 py-2.5 pl-8 pr-14 border-b border-gray">
      <img className="block rounded-full" src={thumbnail} alt={name} />
      <p className="block flex-grow align-middle pl-3 text-lg leading-10">{name}</p>
      <p className="block tracking-wide leading-10">{dateValue}</p>
    </li>
  )
}

type Props = { users: SupporterType[] }
export const SupportersList: React.VFC<Props> = ({ users }: Props) => {
  return (
    <>
      <h3 className="text-center text-xl font-semibold tracking-wider">応援してくれた人</h3>
      <ul className="mx-auto mt-14 h-80 overflow-y-scroll">
        {users.map((user, i) => (
          <Supporter thumbnail={user.thumbnail} name={user.name} date={user.date} key={i} />
        ))}
      </ul>
      <p className="mt-14 text-center text-xl text-gray font-semibold tracking-wider">
        合計 {users.length}人
      </p>
    </>
  )
}
