import React from "react"
import Image from "next/image"

const Header: React.VFC<{}> = () => {
  // TODO: ログインの状態をグローバルから渡す
  const isSignedIn = false

  return (
    <header className="">
      {/*logo*/}
      <div className="absolute mt-10 top-0 xl:left-20 left-10">
        <div className="flex items-center">
          <div className="lg:w-16 lg:h-16 w-10 h-10 flex items-center">
            <Image src="/logo/logo.svg" width={80} height={80} />
          </div>

          <div>
            <h1 className="lg:text-4xl text-2xl font-semibold">Stickers</h1>
          </div>
        </div>
      </div>
      {/*end logo*/}

      {/*account*/}
      <div className="mt-10 absolute top-0 xl:right-20 right-10">
        {isSignedIn ? (
          // TODO: マイページへ遷移
          <a href="">
            <div className="lg:w-16 lg:h-16 w-10 h-10 flex items-center rounded-full">
              <Image src="/sample/sample-profile.png" width={80} height={80} />
            </div>
          </a>
        ) : (
          // TODO: Googleサインインへ遷移
          <a href="">
            <div className="lg:w-16 lg:h-16 w-10 h-10 flex items-center">
              <Image src="/icon/guest.svg" width={500} height={500} />
            </div>
          </a>
        )}
      </div>
      {/*end account*/}
    </header>
  )
}

export default Header
