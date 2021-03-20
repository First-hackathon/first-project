import React, { useState } from "react"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import { EditButton } from "../../components/Button/PencilCheckButto"

const Index: React.FC = () => {
  const [EditState, setEditState] = useState<boolean>(true)
  const setEditSetter = (isCheckedMic: boolean) => setEditState(isCheckedMic)
  return (
    <>
      <div className={"flex justify-center"}>
        <div>
          <EditButton edit={EditState} setter={setEditSetter} />
        </div>
        <div>aaa</div>
      </div>
      <p className={"text-gray text-center pt-40"}>
        応援してもらうにはStripeアカウントが必要です。
        <br />
        連携をしてマイPCを作りましょう
      </p>
      <div className={"w-1/4 mx-auto pt-6"}>
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
