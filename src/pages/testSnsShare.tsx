import React from "react"
import { SnsShareButton, SnsType } from "../components/Button/snsShare"

const TestSnsShareButton: React.FC = () => {
  return (
    <>
      <SnsShareButton
        url={"https://www.google.com/"}
        snsType={SnsType.Twitter}
        title={"google検索"}
      />
      <SnsShareButton
        url={"https://www.google.com/"}
        snsType={SnsType.Facebook}
        quote={"google検索"}
      />
      <SnsShareButton url={"https://www.google.com/"} snsType={SnsType.Line} title={"google検索"} />
    </>
  )
}

export default TestSnsShareButton
