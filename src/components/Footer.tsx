import React from "react"
export const Footer: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray">
        <img src="" alt="ロゴ" />
        <p>「小さなステッカーで大きなクリエイター経済を回す」プロジェクト。</p>
      </div>
      <div className="w-full bg-orange flex h-14">
        <p className="text-sm text-white leading-10">&copy; 2021 Sticker. All Rights Reserved.</p>
        <a href="#" className="text-sm text-white leading-10">
          プライバシー
        </a>
        <a href="#" className="text-sm text-white leading-10">
          利用規約
        </a>
      </div>
    </>
  )
}
