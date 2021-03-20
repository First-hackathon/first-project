import React from "react"
import { RoundedButton, RoundedDivSize } from "../Button/RoundButton"
import { Modal } from "./modal"

type props = {
  isOpen: boolean
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
  onButtonClick: Function
  isDisabled: boolean
}

/**
 * スクロール可能なchildren領域とボタンを持ったモーダルコンポーネント
 * @param isOpen:　モーダルの開閉状態
 * @param isOpenSetter: モーダルの開閉状態更新メソッド
 * @param children: 選択部分として表示する内容
 * @param onButtonClick: モーダル内のボタンをクリックした時にコールバック関数
 * @param isDisabled: ボタンが押せるかどうかの状態
 */
export const TrimModal: React.FC<props> = ({
  isOpen,
  // isOpenSetter,
  children,
  onButtonClick,
  isDisabled
}) => {
  const modalToggleHandler = () => {
    // isOpenSetter(false)
  }
  return (
    <Modal isOpen={isOpen} onClick={modalToggleHandler} modalSize={"max-w-7xl"}>
      <>
        <div className={"w-full overflow-scroll max-h-96 sm:max-h-96"}>
          <div className={"w-full"}>{children}</div>
        </div>
        <div className={"w-1/3"}>
          <RoundedButton
            size={RoundedDivSize.M}
            onClick={onButtonClick}
            isDisabled={isDisabled}
            text={"支援金の管理をする"}
          />
        </div>
      </>
    </Modal>
  )
}
