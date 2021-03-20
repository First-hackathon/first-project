import React, { useEffect, useContext } from "react"
import Router from "next/router"
import firebase from "../../utils/firebase"
import { AuthContext } from "../../auth/auth"

const Index: React.VFC<null> = () => {
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    currentUser && Router.push("/")
  }, [currentUser])

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }
  return (
    <div className="container">
      <button onClick={login}>googleでログインする</button>
    </div>
  )
}
export default Index
