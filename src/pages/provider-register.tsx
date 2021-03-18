import { useRouter } from "next/router"
import Stripe from "stripe"
import axios from "axios"

const hostUrl = "http://localhost:3000"

const ProviderRegister: React.VFC<null> = () => {
  const router = useRouter()

  // StripeのAPI用のインスタンスを生成
  const axiosInstance = axios.create({
    baseURL: hostUrl,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
    },
    timeout: 2000
  })

  const createAccount = async () => {
    try {
      // アカウント作成
      const createParams: Stripe.AccountCreateParams = {
        type: "express",
        country: "JP"
      }
      let axiosParams = new URLSearchParams()
      Object.keys(createParams).forEach((key) => {
        axiosParams.append(key, createParams[key])
      })

      let response = await axiosInstance.post("https://api.stripe.com/v1/accounts", axiosParams)

      // アカウント登録リンク生成
      //TODO: refresh_urlとreturn_urlを設定
      const linkParams: Stripe.AccountLinkCreateParams = {
        account: response.data.id,
        refresh_url: `${hostUrl}/reauth`,
        return_url: `${hostUrl}/return`,
        type: "account_onboarding"
      }
      axiosParams = new URLSearchParams()
      Object.keys(linkParams).forEach((key) => {
        axiosParams.append(key, linkParams[key])
      })
      response = await axiosInstance.post("https://api.stripe.com/v1/account_links", axiosParams)

      //リンクへリダイレクト
      await router.push(response.data.url)
    } catch (e) {
      console.log(e)
      // TODO: エラーハンドリング
    }
  }

  return (
    <div>
      <button onClick={() => createAccount()}>アカウントを連携する</button>
    </div>
  )
}

export default ProviderRegister
