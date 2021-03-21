import React from "react"
import Header from "../../components/header"
import { SupportersList } from "../../components/SupportersList"
import { SupporterMock } from "../test/supportersList"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import { Footer } from "../../components/Footer"

const Index: React.VFC = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto">
        <div className="mt-32 mb-14 text-center">
          <h1 className="text-3xl font-bold tracking-wide mb-8">ステッカーズのPC</h1>
          {/* PC */}
          {/* <Image src="ここにfirebaseのURLが入る" /> */}
          <p className="text-gray text-sm tracking-wider mt-4 mb-6">
            ステッカーを貼って応援しよう <br />
            好きなデザインを作って応援できます
          </p>
          <div className="flex justify-center">
            <div className="w-1/5 mx-auto">
              <RoundedButton size={RoundedDivSize.M} onClick={() => {}} text="応援する" />
            </div>
          </div>
        </div>
        <SupportersList users={SupporterMock} />
      </section>
      <Footer />
    </>
  )
}
export default Index
