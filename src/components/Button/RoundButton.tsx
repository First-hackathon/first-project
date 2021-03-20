import React from "react"

type Props = {
  onClick: Function
  // eslint-disable-next-line no-undef
  children: JSX.Element
  isDisabled?: boolean
  className?: string
}

/**
 * ボタンロジック
 * @param onClick: 押した時のハンドラ
 * @param children: ボタンに吐き出す内容
 * @param isDisabled: 押せない状態か
 * @param className: クラス
 */
export const Button: React.FC<Props> = ({ onClick, children, isDisabled = false, className }) => {
  if (isDisabled) {
    return (
      <button onClick={(event) => onClick(event)} disabled={true} className={className}>
        {children}
      </button>
    )
  }
  return (
    <>
      <button
        onClick={(event) => onClick(event)}
        className={`${className} focus:outline-none`}
        type={"button"}
      >
        {children}
      </button>
    </>
  )
}

export enum RoundedDivSize {
  M,
  S,
  L
}

type RoundedProps = {
  size: RoundedDivSize
  isDisabled: boolean
  text: string
}

/**
 * 楕円形のボタン
 * @param size: サイズのタイプ
 * @param isDisabled: 押せる状態か
 * @param text: ボタンに表示させる名前
 */
export const RoundedDiv: React.FC<RoundedProps> = ({ size, isDisabled, text }: RoundedProps) => {
  let themeClass = ""
  let heightClass = ""

  if (isDisabled) {
    themeClass = "bg-gray-300 text-white"
  } else {
    themeClass = "bg-orange"
  }

  switch (size) {
    case RoundedDivSize.S:
      heightClass = "py-2"
      break
    case RoundedDivSize.M:
      heightClass = "py-3"
      break
    case RoundedDivSize.L:
      heightClass = "py-4"
      break
  }

  const children = (
    <p
      className={`rounded-full text-base text-center text-white hover:opacity-75 ${themeClass} ${heightClass}`}
    >
      {text}
    </p>
  )

  // eslint-disable-next-line react/no-children-prop
  return <div children={children} className="w-full" />
}

/**
 * 楕円形のボタン
 * @param colorType: 色のタイプ
 * @param size: サイズのタイプ
 * @param onClick: 押した時のハンドラ
 * @param isDisabled: 押せない状態か
 * @param text: ボタンに表示させる名前
 */

type props = {
  size: RoundedDivSize
  onClick: Function
  isDisabled?: boolean
  text: string
}

export const RoundedButton: React.FC<props> = ({
  size,
  onClick,
  isDisabled = false,
  text
}: props) => {
  const children = <RoundedDiv size={size} text={text} isDisabled={isDisabled} />

  // eslint-disable-next-line react/no-children-prop
  return <Button onClick={onClick} children={children} isDisabled={isDisabled} className="w-full" />
}
