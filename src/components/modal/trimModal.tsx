import React, { useCallback, useEffect, useState } from "react"
import { RoundedButton, RoundedDivSize } from "../Button/RoundButton"
import Cropper from "react-easy-crop"
import Modal from "react-modal"

type props = {
  isOpen: boolean
  isOpenSetter: Function
  // eslint-disable-next-line no-undef
  // children: JSX.Element | JSX.Element[]
  isDisabled: boolean
  image: string
  imageSetter: Function
}

type Coordinate = {
  x: number
  y: number
}

/**
 * スクロール可能なchildren領域とボタンを持ったモーダルコンポーネント
 * @param isOpen:　モーダルの開閉状態
 * @param isOpenSetter: モーダルの開閉状態更新メソッド
 * @param children: 選択部分として表示する内容
 * @param onButtonClick: モーダル内のボタンをクリックした時にコールバック関数
 * @param isDisabled: ボタンが押せるかどうかの状態
 */
export const TrimModal: React.FC<props> = ({
  isOpen,
  isOpenSetter,
  // children,
  isDisabled,
  image,
  imageSetter
}) => {
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [crop, setCrop] = useState<Coordinate>({ x: 0, y: 0 })
  const aspect = 1
  const [isCircle, setIsCircle] = useState<boolean>(false)
  const [croppedImageIsCircle, setCroppedImageIsCircle] = useState<boolean>(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  // Cropperに渡す関数
  const onZoomChange = (zoom) => {
    setZoom(zoom)
  }

  // Cropperに渡す関数
  const onCropChange = (crop) => {
    setCrop(crop)
  }

  // Cropperに渡す関数
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  // トリミングの形を操作するトグルのハンドラー
  const switchShapeToggle = () => {
    setIsCircle(!isCircle)
    const switchToggle = document.querySelector("#switch-toggle")

    const circleIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 111.561 111.561">
  <path id="Icon_feather-circle" data-name="Icon feather-circle" d="M104.561,53.78A50.78,50.78,0,1,1,53.78,3a50.78,50.78,0,0,1,50.78,50.78Z" transform="translate(2 2)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
</svg>
`
    const squareIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100.33 100.33">
  <path id="Icon_feather-square" data-name="Icon feather-square" d="M14.537,4.5H84.793A10.037,10.037,0,0,1,94.83,14.537V84.793A10.037,10.037,0,0,1,84.793,94.83H14.537A10.037,10.037,0,0,1,4.5,84.793V14.537A10.037,10.037,0,0,1,14.537,4.5Z" transform="translate(0.5 0.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
</svg>
`
    if (!isCircle) {
      switchToggle.classList.remove("bg-orange", "-translate-x-2")
      switchToggle.classList.add("bg-pink", "translate-x-full")
      setTimeout(() => {
        switchToggle.innerHTML = circleIcon
      }, 250)
    } else {
      switchToggle.classList.add("bg-orange", "-translate-x-2")
      switchToggle.classList.remove("bg-pink", "translate-x-full")
      setTimeout(() => {
        switchToggle.innerHTML = squareIcon
      }, 250)
    }
  }

  // トリミングした画像を生成する
  const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const createImage = (url) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.addEventListener("load", () => resolve(image))
        image.addEventListener("error", (error) => reject(error))
        image.setAttribute("crossOrigin", "anonymous") // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
      })

    function getRadianAngle(degreeValue) {
      return (degreeValue * Math.PI) / 180
    }

    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea
    canvas.height = safeArea

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.rotate(getRadianAngle(rotation))
    ctx.translate(-safeArea / 2, -safeArea / 2)

    // draw rotated image and store data.
    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5)
    const data = ctx.getImageData(0, 0, safeArea, safeArea)

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    )

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(URL.createObjectURL(file))
      }, "image/jpeg")
    })
  }

  // トリミングして状態を更新
  const cropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)
      setCroppedImage(croppedImage)
      imageSetter(croppedImage)
      isOpenSetter(false)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  useEffect(() => {
    setCroppedImageIsCircle(isCircle)
  }, [croppedImage])

  return (
    <Modal isOpen={isOpen}>
      {/*<Modal isOpen={isOpen} onClick={()=>modalToggleHandler()} modalSize={"max-w-7xl"}>*/}
      <>
        <div className="w-full">
          <div className="lg:h-96 md:h-72 h-60 relative mb-6">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              cropShape={isCircle ? "round" : "rect"}
            />
          </div>

          <div className="mb-4">
            <div className="font-bold text-lg">ズーム</div>
            <input
              className="rounded-lg overflow-hidden bg-gray h-3 w-full"
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => {
                setZoom(parseFloat(e.currentTarget.value))
              }}
            />
          </div>

          <div className="mb-4">
            <div className="font-bold text-lg">回転</div>
            <input
              className="rounded-lg overflow-hidden bg-gray h-3 w-full"
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotation}
              onChange={(e) => {
                setRotation(parseInt(e.currentTarget.value))
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="font-bold text-lg mr-4 f">形状</div>
              <button
                className="mx-3 w-16 h-8 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
                onClick={() => switchShapeToggle()}
              >
                <div
                  id="switch-toggle"
                  className="w-8 h-8 relative rounded-full transition duration-500 transform bg-orange -translate-x-2 p-1 text-white flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 100.33 100.33"
                  >
                    <path
                      id="Icon_feather-square"
                      data-name="Icon feather-square"
                      d="M14.537,4.5H84.793A10.037,10.037,0,0,1,94.83,14.537V84.793A10.037,10.037,0,0,1,84.793,94.83H14.537A10.037,10.037,0,0,1,4.5,84.793V14.537A10.037,10.037,0,0,1,14.537,4.5Z"
                      transform="translate(0.5 0.5)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="10"
                    />
                  </svg>
                </div>
              </button>
            </div>

            <div className={"xl:w-1/3 lg:w-1/2 md:w-2/3 w-full"}>
              <RoundedButton
                size={RoundedDivSize.M}
                onClick={() => cropImage()}
                isDisabled={isDisabled}
                text={"トリミングする"}
              />
            </div>
          </div>

          {/*{croppedImage != undefined ? (*/}
          {/*  <img src={croppedImage} alt="" className={croppedImageIsCircle ? "rounded-full" : ""} />*/}
          {/*) : (*/}
          {/*  <></>*/}
          {/*)}*/}
        </div>
      </>
    </Modal>
  )
}
