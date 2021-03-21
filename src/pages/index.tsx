import React, { useContext, useEffect } from "react"
import Image from "next/image"
import Header from "../components/header"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase/app"
import { auth } from "../utils/firebase"
import { AuthContext } from "../auth/auth"
import { createUser, getUser } from "../repository/userRepository"
import { Footer } from "../components/Footer"
import { User } from "../model/user.model"

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

const Index: React.VFC<null> = () => {
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      // db存在するユーザーか判断する
      getUser().then((user) => {
        if (!user) {
          // ユーザーがdbにいなかったら新規登録
          createUser({
            id: currentUser.uid,
            name: currentUser.displayName,
            thumbnail: currentUser.photoURL
          } as User)
            .then(() => {
              console.log("登録成功")
            })
            .catch((e) => {
              console.log(e)
            })
        }
      })
    }
  }, [currentUser])

  return (
    <>
      <section className="relative w-full text-white">
        <Image src="/image/hero.png" width={1920} height={1080} />

        <div className="lg:mx-auto px-5">
          <Header />

          <div className="absolute top-0 xl:mt-72 lg:mt-60 mt-32 px-20 container xl:ml-20">
            <h2 className="xl:text-7xl lg:text-5xl md:text-3xl font-semibold xl:leading-20 lg:leading-16 xl:mb-16 lg:mb-10 mb-5">
              クリエイターのPCに
              <br />
              ステッカーを貼って応援
            </h2>

            <p className="lg:leading-8 mb-8 xl:text-xl lg:text-md text-sm">
              コーヒー１杯分を贈る感覚で、好きなクリエイターを応援
              <br />
              することができます。
            </p>
            {!currentUser ? <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> : null}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 flex justify-between items-center my-20">
          <div className="mt-10 w-6/12">
            <div className="xl:text-6xl lg:text-5xl md:text-3xl font-semibold xl:leading-20 lg:leading-16 lg:mb-10 mb-5">
              ファンからステッカー
              <br />
              を贈る
            </div>

            <div className="xl:text-xl lg:text-md text-sm text-sm">
              <p>
                クリエイターに向けて「ステッカー」という形のファンから小さい応援を贈ることができます。クリエイターはステッカーを貼ってもらうPCをバーチャルでつくるだけで始めることができます。
              </p>
            </div>
          </div>

          <div className="w-5/12">
            <Image src="/image/pc-sticker.png" width={742} height={505} />
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center">
        <Image src="/decorate/wave-white2orange.png" width={1920} height={140} />
        {/* description */}
        <div className="bg-orange text-white">
          <div className="container mx-auto px-5 flex justify-between items-center">
            <div className="mt-10 w-6/12">
              <div className="xl:text-6xl lg:text-5xl md:text-3xl font-semibold xl:leading-20 lg:leading-16 lg:mb-32 mb-15">
                Stickersで
                <br />
                できること
              </div>

              {/* start fan */}
              <div className="lg:mb-32 mb-15">
                <div className="xl:text-4xl lg:text-3xl md:text-xl font-semibold lg:mb-20 mb-10">
                  ファン
                </div>

                <div className="lg:mb-20 mb-10">
                  <div className="xl:text-3xl lg:text-2xl md:text-md font-semibold lg:mb-10 mb-5">
                    ステッカーを貼ることで応援
                  </div>

                  <div className="xl:text-xl lg:text-md text-sm text-sm">
                    <p>
                      好きなクリエイターのバーチャルPCにステッカーを貼って応援しよう。ワンコインから購入して貼ることができます。{" "}
                    </p>
                  </div>
                </div>

                <div className="lg:mb-20 mb-10">
                  <div className="xl:text-3xl lg:text-2xl md:text-md font-semibold lg:mb-10 mb-5">
                    ステッカーを貼ることで応援
                  </div>

                  <div className="xl:text-xl lg:text-md text-sm text-sm">
                    <p>
                      好きなクリエイターのバーチャルPCにステッカーを貼って応援しよう。ワンコインから購入して貼ることができます。{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* end fan */}

              {/* start fan */}
              <div className="lg:mb-32 mb-15">
                <div className="xl:text-4xl lg:text-3xl md:text-xl font-semibold lg:mb-20 mb-10">
                  クリエイター
                </div>

                <div className="lg:mb-20 mb-10">
                  <div className="xl:text-3xl lg:text-2xl md:text-md font-semibold lg:mb-10 mb-5">
                    バーチャルPCをつくって応援してもらう
                  </div>

                  <div className="xl:text-xl lg:text-md text-sm text-sm">
                    <p>
                      ステッカーを貼るバーチャルPCを作って、応援をしてもらう準備をしましょう。ファンはシェアしたURLからクリエイターのページを見ることができるので、SNSで共有やプロフィールにURLを載せましょう。。ワンコインから購入して貼ることができます。{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* end fan */}
            </div>

            <div className="w-5/12">
              <Image src="/image/description-illustration.png" width={690} height={722} />
            </div>
          </div>
        </div>

        {/* end description */}

        <Image src="/decorate/wave-orange2gray.png" width={1920} height={126} />
      </section>

      <Footer />
    </>
  )
}

export default Index
