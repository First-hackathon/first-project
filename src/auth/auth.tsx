import { User } from "@firebase/firestore/dist/firestore/src/auth/user"
import React, { createContext, useEffect, useState } from "react"

import firebase from "../utils/firebase"
import { JSX } from "@babel/types"

type AuthContextProps = {
  currentUser: User | null | undefined
}

type Props = {
  children: JSX.Element
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

const Auth: React.VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    // ログイン状態が変化するとfirebaseのauthメソッドを呼び出す
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  /* 下階層のコンポーネントをラップする */
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, Auth }
