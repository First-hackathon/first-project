import React, { useEffect } from "react"
import { SnsShareButton, SnsType } from "../components/Button/snsShare"
import { Helmet } from "react-helmet"
import { useRouter } from "next/router"

const TestSnsShareButton: React.FC = () => {
  // const [setCurrentUrlState, CurrentUrlState] = useState<string>("")
  const router = useRouter()
  const baseUrl = "http://stickers-staging.vercel.app"
  const currentUrl: string = baseUrl + router.pathname
  const imgUrl = "https://thumb.photo-ac.com/a9/a9e8d7bcc93603347b5ae99dad27538e_t.jpeg"

  useEffect(() => {
    console.log(location.href)
  }, [])

  return (
    <>
      <Helmet
        title={"Lives&Lives"}
        meta={[
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:site", content: "@sota35163013" },
          { name: "twitter:creator", content: "@sota35163013" },
          { property: "og:title", content: "Lives&Lives" },
          { property: "og:type", content: "article" },
          { property: "og:url", content: currentUrl },
          { property: "og:image", content: imgUrl },
          { property: "og:description", content: "動物たちのイキイキとした姿をみんなで観察" }
        ]}
      />
      <div className={"flex"}>
        <img src={imgUrl} alt="alt-text" style={{ width: "600px" }} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Twitter} />
        <SnsShareButton url={currentUrl} snsType={SnsType.Facebook} quote={"google検索"} />
        <SnsShareButton url={"https://github.co.jp/"} snsType={SnsType.Line} title={"google検索"} />
      </div>
    </>
  )
}

export default TestSnsShareButton
