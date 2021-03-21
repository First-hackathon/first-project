import React from "react"
import styled from "styled-components"
import Image from "next/image"

type Props = {
  edit: boolean
  setter: any
}

const Button = styled.button`
  &:focus {
    outline: 0;
  }
`

/**
 * 編集ボタン
 * @param edit: ONかOFFか
 * @param setter: 状態更新メソッド
 */

export const EditButton: React.FC<Props> = ({ edit, setter }) => {
  let icon
  if (edit) {
    icon = <Image src={"/images/icon/Check.svg"} alt={"pen"} width={30} height={30} />
  } else {
    icon = <Image src={"/images/icon/pencil.svg"} alt={"check"} width={30} height={30} />
  }

  const handleOnClick = () => {
    setter(!edit)
  }
  return (
    <Button className={"outline-none"} onClick={handleOnClick}>
      {icon}
    </Button>
  )
}
