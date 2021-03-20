import { SnsShareButton, SnsType } from "../components/Button/snsShare"
import { useRouter } from "next/router"
import { MetaHead } from "../components/Head"
import React from "react"

const TestSnsShareButton: React.FC = () => {
  const router = useRouter()
  const baseUrl = "http://stickers-staging.vercel.app"
  const currentUrl: string = baseUrl + router.pathname
  const image1 = "https://images-na.ssl-images-amazon.com/images/I/615Czv1hTLL.jpg"
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
