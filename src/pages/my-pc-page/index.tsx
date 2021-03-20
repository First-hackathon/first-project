import React from "react"
import Header from "../../components/header"
import Image from "next/image"
import { SupportersList } from "../../components/SupportersList"
import { SupporterMock } from "../test/supportersList"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import { SnsShareButton, SnsType } from "../../components/Button/snsShare"

const Index: React.VFC = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto">
        <div className="mt-32 mb-14 text-center">
          <h1 className="text-3xl font-bold tracking-wide mb-8">あなたのPC</h1>
          {/* PC */}
          {/* <Image src="ここにfirebaseのURLが入る" /> */}
          <p className="text-gray text-sm tracking-wider mt-4 mb-6">
            シェアをして応援してもらおう！ <br />
            画像をダウンロードすることもできます
          </p>
          <div className="flex justify-center">
            {/* <Image src={"/icon/twitterShareIcon.svg"} width={40} height={40} /> */}
            {/* TODO: ここにPCIDから生成したURLを入れる */}
            <SnsShareButton url="/icon/twitterShareIcon.svg" snsType={SnsType.Twitter} />
            {/* <Image src={"/icon/shareUrlIcon.svg"} width={40} height={40} /> */}
            {/* <Image src={"/icon/downloadIcon.svg"} width={40} height={40} /> */}
          </div>
        </div>
        <SupportersList users={SupporterMock} />
        <div className="w-1/5 mx-auto">
          <RoundedButton size={RoundedDivSize.M} onClick={() => {}} text="支援金の管理をする" />
        </div>
      </section>
    </>
  )
}
export default Index
