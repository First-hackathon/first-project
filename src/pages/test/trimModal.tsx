import { TrimModal } from "../../components/modal/trimModal"
import Trim from "../trimming"
import React from "react"

const Index: React.VFC<{}> = () => {
  const image = "/image/hero.png"

  return (
    <div>
      <TrimModal isOpen={true} onButtonClick={() => {}} isDisabled={false} image={image}>
        <Trim />
      </TrimModal>
    </div>
  )
}
export default Index
