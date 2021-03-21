import React from "react"
import Image from "next/image"
export const Footer: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-light pt-16">
        <div className="max-w-md mx-auto text-center pb-8">
          <div className="text-center">
            <div className="lg:w-16 lg:h-16 w-10 h-10 mx-auto">
              <Image src="/logo/logo.svg" width={80} height={80} />
            </div>

            <div>
              <h1 className="lg:text-4xl text-2xl font-semibold">Stickers</h1>
            </div>
          </div>

          <p className="text-left text-gray">
            「小さなステッカーで大きなクリエイター経済を回す」
            <br />
            プロジェクト。
          </p>
        </div>
      </div>
      <div className="w-full bg-orange h-16 py-2.5">
        <div className="container mx-auto flex justify-between">
          <p className="text-sm text-white leading-10">&copy; 2021 Sticker. All Rights Reserved.</p>
          <div className="w-1/4 flex justify-around">
            <a href="#" className="block text-sm text-white leading-10">
              プライバシー
            </a>
            <a href="#" className="block text-sm text-white leading-10">
              利用規約
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
