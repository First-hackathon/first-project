import React from "react"
import styled from "styled-components"
import Image from "next/image"

const Div = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  display: none;
  &.fadeIn {
    display: block;
    animation: fadeIn 0.25s;
  }
`

type Props = {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
  isOpen: boolean
  onClick: Function
  modalSize: string
}

/**
 * Modalを表示させる
 * @param children: 表示させたい内容
 * @param isOpen: モーダルの開閉状態
 * @param onClick: ハンドラ
 */
export const Modal: React.VFC<Props> = ({ children, isOpen, onClick, modalSize }: Props) => {
  return (
    <Div className={`${isOpen ? "fadeIn" : ""}  fixed relative `}>
      <div
        className="fixed bg-black opacity-40 w-full h-full top-0 left-0 z-50"
        onClick={() => onClick()}
      />
      <div
        className={`${modalSize} flex justify-center items-center overflow-auto bg-white w-10/12 rounded-lg z-50 fixed top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4`}
      >
        <div className="py-1 px-3 w-full h-full">
          <div className="relative">
            <div className="absolute h-4 top-0 right-0">
              <div className={"flex flex-col justify-center text-center mx-auto"}>
                <Image src={"/icon/cross.svg"} width={20} height={30} onClick={() => {}} />
              </div>
            </div>
          </div>
          <div className="mt-8 mb-6 mx-3 flex flex-col justify-center items-center">{children}</div>
        </div>
      </div>
    </Div>
  )
}
