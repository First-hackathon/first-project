import { TrimModal } from "../../components/modal/trimModal"
import Trim from "../trimming"

const Index: React.VFC<{}> = () => {
  return (
    <div>
      <TrimModal isOpen={true} onButtonClick={() => {}} isDisabled={false}>
        <Trim />
      </TrimModal>
    </div>
  )
}
export default Index
