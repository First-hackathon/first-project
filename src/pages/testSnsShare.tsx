import React, { useEffect } from "react"
import { SnsShareButton, SnsType } from "../components/Button/snsShare"
import { useRouter } from "next/router"
import Head from "next/head"
import { StaticImage } from "../components/staticImage"
import { MetaHead } from "../components/Head"

const TestSnsShareButton: React.FC = () => {
  const router = useRouter()
  const baseUrl = "http://stickers-staging.vercel.app"

  const date = new Date()
  const a = date.getTime()
  const TimeStamp = Math.floor(a / 1000)

  const currentUrl: string = baseUrl + router.pathname

  const image1 = require("~/public/images/opgTestCat.jpg")
  // const webpImage1 = require("~/public/images/opgTestCat.jpg?webp")

  return (
    <>
      <MetaHead
        title={"テストテスト"}
        description={"テストテスト"}
        keyword={"キーワード"}
        image={image1}
        url={currentUrl}
      />
      <div className={"flex"}>
        <img src={image1} alt="alt-text" style={{ width: "600px" }} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Twitter} title={"OGP test"} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Facebook} quote={"OGP test"} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Line} title={"OGP test"} />
      </div>
    </>
  )
}

export default TestSnsShareButton
