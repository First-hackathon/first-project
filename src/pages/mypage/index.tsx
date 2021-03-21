import React, { useContext, useEffect, useState } from "react"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import { EditButton } from "../../components/Button/EditButton"
import styled from "styled-components"
import Image from "next/image"
import Header from "../../components/header"
import { getUser } from "../../repository/userRepository"
import { AuthContext } from "../../auth/auth"
import StripeAPI from "stripe"
import { useRouter } from "next/router"
import axios from "axios"
import { User } from "../../model/user.model"
import { firestore } from "../../utils/firebase"
import { Footer } from "../../components/Footer"

const Index: React.FC = () => {
  const { currentUser } = useContext(AuthContext)

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

  const InputBox = styled.input`
    &::placeholder {
      color: #a7a7a7;
      font-size: 1rem;
      padding-left: 0.75rem;
    }
  `
  const TextBox = styled.textarea`
    &::placeholder {
      color: #a7a7a7;
      font-size: 1rem;
      padding-left: 0.75rem;
    }
  `
  // TODO:データベースが出来次第使用
  const [nameInput, nameSetInput] = useState<string>()
  // TODO:データベースが出来次第使用
  const [profileInput, setProfileInput] = useState<string>()

  const [imageEditState, setImageEditState] = useState<boolean>(false)
  const setImageEditSetter = (isCheckedImage: boolean) => setImageEditState(isCheckedImage)

  const [userEditState, setUserEditState] = useState<boolean>(false)
  const setUserEditSetter = (isCheckedUser: boolean) => setUserEditState(isCheckedUser)

  const [profileEditState, setProfileEditState] = useState<boolean>(false)
  const setEditSetter = (isCheckedProfile: boolean) => setProfileEditState(isCheckedProfile)

  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    if (currentUser) {
      getUser().then((user) => {
        if (user) {
          setUser(user)
          nameSetInput(user.name)
          setProfileInput(user.profile)
        }
      })
    }
  }, [currentUser])

  // アカウントを作成するためのリンクを取得して遷移させる
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
      // TODO: refresh_urlとreturn_urlを設定
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

  const getDashboardUrl = async () => {
    try {
      // TODO: DBからfirebase idに紐づいているstripe idをとってくる, 下のidは入れ替え
      const id = "acct_1IWG3iPwhcz9FWG1"

      const response = await axiosInstance.post(
        `https://api.stripe.com/v1/accounts/${id}/login_links`
      )
      await router.push(response.data.url)
    } catch (e) {
      console.log(e)
      // TODO: エラーハンドリング
    }
  }

  return (
    <>
      <Header />
      <div className={"mt-44 flex justify-center"}>
        <div className={"flex justify-center h-40"}>
          <Image src={"/images/icon/profileImage.svg"} alt={"pen"} width={140} height={140} />
          <div className={"pb-4 pr-4"}>
            <EditButton edit={imageEditState} setter={setImageEditSetter} />
          </div>
        </div>
        <div className={"pl-8 w-2/5"}>
          <div className={"flex"}>
            <p className={"text-2xl mr-4 font-bold"}>ユーザー名</p>
            <EditButton edit={userEditState} setter={setUserEditSetter} />
          </div>
          {userEditState ? (
            <InputBox
              type={"text"}
              className={"border border-solid border-whitegray w-4/5 h-10 rounded-md"}
              placeholder={"名前を入力"}
              value={nameInput}
            />
          ) : (
            <p className={"text-gray text-3xl font-bold"}>{nameInput}</p>
          )}
          <div className={"flex pt-6"}>
            <p className={"text-2xl mr-4 font-bold"}>プロフィール</p>
            <EditButton edit={profileEditState} setter={setEditSetter} />
          </div>
          {profileEditState ? (
            <TextBox
              name={"プロフィール"}
              rows={6}
              className={"border border-solid border-whitegray w-full rounded-md"}
              cols={200}
              placeholder={"プロフィール入力"}
              value={profileInput}
            />
          ) : (
            <>
              <p className={"text-gray text-left"}>{profileInput}</p>
            </>
          )}
        </div>
      </div>
      <p className={"text-gray text-center pt-40"}>
        応援してもらうにはStripeアカウントが必要です。
        <br />
        連携をしてマイPCを作りましょう
      </p>

      {user ? (
        user.stripeAccountId ? (
          <div className="flex w-1/3 mx-auto pt-6">
            <RoundedButton
              size={RoundedDivSize.M}
              onClick={() => {
                getDashboardUrl()
              }}
              text={"stripe管理画面を開く"}
            />
            <div className="w-1/12" />
            <RoundedButton
              size={RoundedDivSize.M}
              onClick={() => {
                router.push("/my-pc")
              }}
              text={"マイPCをみる"}
            />
          </div>
        ) : (
          <div className={"w-1/4 mx-auto pt-6"}>
            <RoundedButton
              size={RoundedDivSize.M}
              onClick={() => {
                createAccount()
              }}
              text={"Stripeアカウントを連携する"}
            />
          </div>
        )
      ) : null}
      <Footer />
    </>
  )
}
export default Index
