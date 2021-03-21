import React from "react"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import Image from "next/image"
import Header from "../../components/header"
import { Footer } from "../../components/Footer"

const Index: React.FC = () => {
  return (
    <>
      <Header />
      <section className="mt-32 mb-20">
        <div className={"pt-6"}>
          <p className={"text-center text-3xl"}>Stripeアカウント連携が失敗しました</p>
        </div>
        <div className={"flex justify-center pt-8"}>
          <Image src="/image/deniedImage.png" width={523} height={322} />
        </div>
        <p className={"text-gray text-center pt-6"}>
          何か問題が起きたようです
          <br />
          もう一度Stripeアカウントの連携を
          <br />
          試してみてください
        </p>
        <div className={"mx-auto xl:w-1/3 lg:w-1/2 md:w-2/3 w-full pt-6"}>
          <RoundedButton
            size={RoundedDivSize.M}
            onClick={() => {}}
            text={"Stripeアカウントを連携する"}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Index
