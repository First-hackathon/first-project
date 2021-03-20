import React, { useEffect } from "react"
import { SnsShareButton, SnsType } from "../components/Button/snsShare"
import { useRouter } from "next/router"

const TestSnsShareButton: React.FC = () => {
  // const [setCurrentUrlState, CurrentUrlState] = useState<string>("")
  const router = useRouter()
  const baseUrl = "http://example.com"
  const currentUrl: string = baseUrl + router.pathname
  const imgUrl = "https://thumb.photo-ac.com/a9/a9e8d7bcc93603347b5ae99dad27538e_t.jpeg"

  useEffect(() => {
    console.log(location.href)
  }, [])

  return (
    <>
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
