import React from "react"
import styled from "styled-components"

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
    icon = <img src={require("~/public/images/icon/Check.svg")} alt={"pen"} className={"pr-2"} />
  } else {
    icon = <img src={require("~/public/images/icon/pencil.svg")} alt={"check"} className={"pr-2"} />
  }

  const handleOnClick = () => {
    setter(!edit)
  }
  return <Button onClick={handleOnClick}>{icon}</Button>
}
