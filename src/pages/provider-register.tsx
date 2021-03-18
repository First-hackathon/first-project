import { useRouter } from "next/router"
import StripeAPI from "stripe"
import axios from "axios"

const hostUrl = "http://localhost:3000"

const ProviderRegister: React.VFC<null> = () => {
  const router = useRouter()

  // HACK: StripeのSDK(import Stripe from "stripe")でうまく送信できないのでaxiosを使用
  // StripeのAPI用のインスタンスを生成
  const axiosInstance = axios.create({
    baseURL: hostUrl,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
    },
    timeout: 2000
  })

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
      //TODO: 全体を状態管理しているやつにstripeのアカウントIDを保存

      // アカウント登録リンク生成
      //TODO: refresh_urlとreturn_urlを設定
      const linkParams: StripeAPI.AccountLinkCreateParams = {
        account: account.id,
        refresh_url: `${hostUrl}/reauth`,
        return_url: `${hostUrl}/return`,
        type: "account_onboarding"
      }
      axiosParams = new URLSearchParams()
      Object.keys(linkParams).forEach((key) => {
        axiosParams.append(key, linkParams[key])
      })
      response = await axiosInstance.post("https://api.stripe.com/v1/account_links", axiosParams)
      const accountLink: StripeAPI.AccountLink = response.data

      //リンクへリダイレクト
      await router.push(accountLink.url)
    } catch (e) {
      console.log(e)
      // TODO: エラーハンドリング
    }
  }

  const getDashboardUrl = async () => {
    try {
      //TODO: DBからfirebase idに紐づいているstripe idをとってくる, 下のidは入れ替え
      const id = "acct_1IWDvIPtFr4bVSKg"

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
    <div>
      <div className="inline-block mr-2 mt-2">
        <button
          type="button"
          className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
          onClick={() => createAccount()}
        >
          アカウントを連携する
        </button>
      </div>
      <div className="inline-block mr-2 mt-2">
        <button
          type="button"
          className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg"
          onClick={() => getDashboardUrl()}
        >
          管理画面を開く
        </button>
      </div>
    </div>
  )
}

export default ProviderRegister
