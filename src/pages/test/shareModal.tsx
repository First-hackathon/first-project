import Image from "next/image"
import React from "react"
import { ShareModal } from "../../components/modal/shareModal"

const Index: React.VFC<{}> = () => {
  return (
    <div>
      <ShareModal
        isOpen={true}
        currentUrl={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || "http://localhost:3000"}
      >
        <Image src="/pc.jpg" width={300} height={200} />
      </ShareModal>
    </div>
  )
}
export default Index
