import React from "react"
import { Modal } from "./modal"
import { SnsShareButton, SnsType } from "../Button/snsShare"

type Props = {
  isOpen: boolean
  // eslint-disable-next-line no-undef
  children: JSX.Element
  currentUrl: string
}
export const ShareModal: React.VFC<Props> = ({ isOpen, children, currentUrl }) => {
  return (
    <Modal isOpen={isOpen} onClick={() => {}} modalSize={"max-w-7xl"}>
      <div className={"text-xl font-bold mb-3"}>ステッカーを貼りました！</div>
      <div>{children}</div>
      <div className={"my-5 "}>
        <div className={"text-xs"}>シェアして応援したことを伝えよう！</div>
        <div className={"text-xs "}>応援の輪を広げよう</div>
      </div>
      <div className={"flex"}>
        <div className={"mx-2"}>
          <SnsShareButton url={currentUrl} snsType={SnsType.Twitter} title={"OGP test"} />
        </div>
        <div className={"mx-2"}>
          <SnsShareButton url={currentUrl} snsType={SnsType.Facebook} quote={"OGP test"} />
        </div>
        <div className={"mx-2"}>
          <SnsShareButton url={currentUrl} snsType={SnsType.Line} title={"OGP test"} />
        </div>
      </div>
    </Modal>
  )
}
