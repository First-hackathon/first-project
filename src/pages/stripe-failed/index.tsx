import React from "react"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import Image from "next/image"

const Index: React.FC = () => {
  return (
    <>
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
      <div className={"w-1/5 mx-auto pt-6"}>
        <RoundedButton
          size={RoundedDivSize.M}
          onClick={() => {}}
          text={"Stripeアカウントを連携する"}
        />
      </div>
    </>
  )
}

export default Index
