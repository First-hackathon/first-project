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
      <section className="container mx-auto mt-32">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-bold tracking-wide mb-8">ステッカーズのPC</h1>
          {/* PC */}
          {/* <Image src="ここにfirebaseのURLが入る" /> */}
          <p className="text-gray text-sm tracking-wider mt-4 mb-6">
            ステッカーを貼って応援しよう <br />
            好きなデザインを作って応援できます
          </p>
          <div className="flex justify-center">
            <div className="mx-auto xl:w-1/3 lg:w-1/2 md:w-2/3 w-full">
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
