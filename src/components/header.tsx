import React, { useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { AuthContext } from "../auth/auth"

const Header: React.VFC<{}> = () => {
  // TODO: ログインの状態をグローバルから渡す
  const { currentUser } = useContext(AuthContext)

  return (
    <header className="">
      {/* logo */}
      <Link href="/">
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
      </Link>
      {/* end logo */}

      {/* account */}
      <div className="mt-10 absolute top-0 xl:right-20 right-10">
        {currentUser ? (
          <Link href="/mypage">
            <a>
              {/* TODO: マイページへ遷移 */}
              <div className="lg:w-16 lg:h-16 w-10 h-10 flex items-center rounded-full">
                <img src={currentUser.photoURL} width={80} height={80} alt="サムネイル画像" />
              </div>
            </a>
          </Link>
        ) : (
          <>
            {/* <a href=""> */}
            {/*  /!* TODO: Googleサインインへ遷移 *!/ */}
            {/*  <div className="lg:w-16 lg:h-16 w-10 h-10 flex items-center"> */}
            {/*    {router.pathname == "/" ? ( */}
            {/*      <Image src="/icon/guest.svg" width={500} height={500} /> */}
            {/*    ) : ( */}
            {/*      <Image src="/icon/guest-black.svg" width={500} height={500} /> */}
            {/*    )} */}
            {/*  </div> */}
            {/* </a> */}
          </>
        )}
      </div>
      {/* end account */}
    </header>
  )
}

export default Header
