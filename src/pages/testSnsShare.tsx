import React, { useEffect } from "react"
import { SnsShareButton, SnsType } from "../components/Button/snsShare"
import { useRouter } from "next/router"
import Head from "next/head"

const TestSnsShareButton: React.FC = () => {
  const router = useRouter()
  const baseUrl = "http://stickers-staging.vercel.app"
  const currentUrl: string = baseUrl + router.pathname
  const imgUrl = "https://thumb.photo-ac.com/a9/a9e8d7bcc93603347b5ae99dad27538e_t.jpeg"
  const imgUrlSecond =
    "https://dol.ismcdn.jp/mwimgs/a/f/-/img_afa0fad37e6c4d5ce34c01faf54f9e79108563.jpg"

  useEffect(() => {
    console.log(location.href)
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:site" content="@sota35163013" />
        <meta property="og:image" key="ogImage" content={imgUrlSecond} />
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={currentUrl} />
        <meta name="twitter:title" content="テストテストテストテストテストテスト" />
        <meta name="description" content="テストテストテストテストテストテスト" />
      </Head>
      <div className={"flex"}>
        <img src={imgUrl} alt="alt-text" style={{ width: "600px" }} />
        <img src={imgUrlSecond} alt="alt-text" style={{ width: "600px" }} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Twitter} title={"OGP test"} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Facebook} quote={"OGP test"} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Line} title={"OGP test"} />
      </div>
    </>
  )
}

export default TestSnsShareButton
