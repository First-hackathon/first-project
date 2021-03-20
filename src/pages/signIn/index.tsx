import React, { useEffect, useContext } from "react"
import Router from "next/router"
import firebase, { auth } from "../../utils/firebase"
import { AuthContext } from "../../auth/auth"

const Index: React.VFC<null> = () => {
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    currentUser && Router.push("/")
  }, [currentUser])

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithRedirect(provider)
  }
  return (
    <div className="container">
      <button onClick={login}>googleでログインする</button>
    </div>
  )
}
export default Index
