import React, { useEffect, useState } from "react"
import { User } from "../../model/user.model"
import { auth } from "../../utils/firebase"
import { createUser, getUser, updateUser } from "../../repository/userRepository"

const Index: React.VFC = () => {
  const [user, setUser] = useState<User | undefined>()
  const [nameInput, setNameInput] = useState<string>("")
  const [profile, setProfile] = useState<string>()
  useEffect(() => {
    let userData
    if (profile) {
      userData = {
        id: auth.currentUser ? auth.currentUser.uid : "",
        name: nameInput,
        thumbnail: nameInput,
        profile: profile
      }
    } else {
      userData = {
        id: auth.currentUser ? auth.currentUser.uid : "",
        name: nameInput,
        thumbnail: nameInput
      }
    }
    console.log(userData)
    setUser(userData)
  }, [nameInput, profile])
  return (
    <div>
      <input
        type="text"
        placeholder="nameとthumbnailの値"
        className="bg-blue"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value)
        }}
      />
      <br />
      <button
        onClick={() => {
          createUser(user)
            .then(() => {
              console.log("成功!!!")
            })
            .catch((e) => {
              console.log(e)
            })
        }}
      >
        ユーザー登録
      </button>
      <br />
      <input
        type="text"
        className="bg-blue"
        placeholder="プロフィールの値"
        value={profile}
        onChange={(e) => {
          setProfile(e.target.value)
        }}
      />
      <br />
      <button
        onClick={() => {
          updateUser({ name: "田川裕介" })
            .then(() => {
              console.log("成功!!!")
            })
            .catch((e) => {
              console.log(e)
            })
        }}
      >
        ユーザー更新
      </button>

      <br />
      <button
        onClick={() => {
          getUser()
            .then((user) => {
              console.log(user)
            })
            .catch((e) => {
              console.log(e)
            })
        }}
      >
        ユーザー取得
      </button>
      <br />
    </div>
  )
}
export default Index
