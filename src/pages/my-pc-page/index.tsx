import React from "react"
import Header from "../../components/header"
import Image from "next/image"
import { SupportersList } from "../../components/SupportersList"
import { SupporterMock } from "../test/supportersList"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"

const Index: React.VFC = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto">
        <div className="mt-5 mb-14 text-center">
          <h1>あなたのPC</h1>
          {/* PC */}
          <p className="text-gray-300 text-sm tracking-wider">
            シェアをして応援してもらおう！ <br />
            画像をダウンロードすることもできます
          </p>
          <div className="flex justify-around">
            <Image src={"/icon/twitterShareIcon.svg"} width={40} height={40} />
            <Image src={"/icon/shareUrlIcon.svg"} width={40} height={40} />
            <Image src={"/icon/downloadIcon.svg"} width={40} height={40} />
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
