import React from "react"

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from "react-share"

export enum SnsType {
  Twitter,
  Facebook,
  Line
}

type Props = {
  url: string
  snsType: SnsType
  quote?: string
  title?: string
}

/**
 * SNS共有ボタン
 * @param url: シェアしたいURL
 * @param SNSType: シェアしたいSNSの種類
 * @param quote: シェア時に一緒に投稿したいテキスト(Facebookのみ)
 * @param title: シェア時に一緒に投稿したいタイトル(Twitter・LINE)
 **/

export const SnsShareButton: React.FC<Props> = ({ url, snsType, quote, title }) => {
  let SNSButton

  switch (snsType) {
    case SnsType.Twitter:
      SNSButton = (
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      )
      break
    case SnsType.Facebook:
      SNSButton = (
        <FacebookShareButton url={url} quote={quote}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      )
      break
    case SnsType.Line:
      SNSButton = (
        <LineShareButton url={url} title={title}>
          <LineIcon size={32} round />
        </LineShareButton>
      )
      break
  }
  return (
    <>
      <div>{SNSButton}</div>
    </>
  )
}
