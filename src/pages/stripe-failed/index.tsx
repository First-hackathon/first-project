import React, { useContext, useEffect, useState } from "react"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import Image from "next/image"
import StripeAPI from "stripe"
import { useRouter } from "next/router"
import axios from "axios"
import { AuthContext } from "../../auth/auth"
import { firestore } from "../../utils/firebase"
import firebase from "firebase/app"
import { getUser } from "../../repository/userRepository"
import { User } from "../../model/user.model"
import Header from "../../components/header"
import { Footer } from "../../components/Footer"

const Index: React.FC = () => {
  const { currentUser } = useContext(AuthContext)

  const [user, setUser] = useState<User | undefined>()

  const hostName = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000"

  const router = useRouter()

  // HACK: StripeのSDK(import Stripe from "stripe")でうまく送信できないのでaxiosを使用
  // StripeのAPI用のインスタンスを生成
  const axiosInstance = axios.create({
    baseURL: hostName,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
    },
    timeout: 2000
  })

  const createAccount = async () => {
    try {
      // アカウント作成
      const createParams: StripeAPI.AccountCreateParams = {
        type: "express",
        country: "JP"
      }

      let axiosParams = new URLSearchParams()
      Object.keys(createParams).forEach((key) => {
        axiosParams.append(key, createParams[key])
      })
      let response = await axiosInstance.post("https://api.stripe.com/v1/accounts", axiosParams)
      const account: StripeAPI.Account = response.data
      // TODO: 全体を状態管理しているやつにstripeのアカウントIDを保存

      const userRef = firestore.collection("user").doc(user.id)
      await userRef.set({ stripeAccountId: account.id }, { merge: true })

      // アカウント登録リンク生成
      const linkParams: StripeAPI.AccountLinkCreateParams = {
        account: account.id,
        refresh_url: `${hostName}/stripe-failed`,
        return_url: `${hostName}/mypage`,
        type: "account_onboarding"
      }
      axiosParams = new URLSearchParams()
      Object.keys(linkParams).forEach((key) => {
        axiosParams.append(key, linkParams[key])
      })
      response = await axiosInstance.post("https://api.stripe.com/v1/account_links", axiosParams)
      const accountLink: StripeAPI.AccountLink = response.data

      // リンクへリダイレクト
      await router.push(accountLink.url)
    } catch (e) {
      console.log(e)
      // TODO: エラーハンドリング
    }
  }

  useEffect(() => {
    // ここのページでストライプアカウントを消している
    ;(async () => {
      if (currentUser) {
        getUser().then((user) => {
          setUser(user)
        })
        const userRef = firestore.collection("user").doc(currentUser.uid)
        await userRef.update({
          stripeAccountId: firebase.firestore.FieldValue.delete()
        })
      }
    })()
  }, [currentUser])

  return (
    <>
      <Header />
      <section className="mt-32 mb-20">
        <div className={"pt-6"}>
          <p className={"text-center text-3xl"}>Stripeアカウント連携が失敗しました</p>
        </div>
        <div className={"flex justify-center pt-8"}>
          <Image src="/image/deniedImage.png" width={523} height={322} />
        </div>
        <p className={"text-gray text-center pt-6"}>
          何か問題が起きたようです
          <br />
          もう一度Stripeアカウントの連携を
          <br />
          試してみてください
        </p>
        <div className={"w-1/5 mx-auto pt-6"}>
          <RoundedButton
            size={RoundedDivSize.M}
            onClick={() => {
              createAccount()
            }}
            text={"Stripeアカウントを連携する"}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Index
