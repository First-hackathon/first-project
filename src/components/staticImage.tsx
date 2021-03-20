import React from "react"

type Props = {
  image: string
  webpImage: string
  alt: string
  className?: string
  pcImage?: string
  webpPcImage?: string
}
/**
 * 静的部分の画像はき出し
 * @param imagePath: イメージ画像のパス(public/images/配下)
 * @param alt: イメージ画像のalt属性
 */
export const StaticImage: React.FC<Props> = ({
  image,
  webpImage,
  alt,
  className,
  pcImage,
  webpPcImage
}: Props) => {
  // NOTE: プラグインがwebpの変換にjpgしか対応してない模様
  return (
    <picture>
      <source media="(max-width:768px)" srcSet={webpImage} type="image/webp" />
      <source media="(max-width:768px)" srcSet={image} type="image/jpeg" />
      <source media="(min-width:769px)" srcSet={webpPcImage} type="image/webp" />
      <source media="(min-width:769px)" srcSet={pcImage} type="image/jpeg" />
      <img
        src={image}
        className={`w-full h-full object-center object-cover ${className}`}
        alt={alt}
      />
    </picture>
  )
}
