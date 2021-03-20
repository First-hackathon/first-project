import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import Cropper from "react-easy-crop"

type Coordinate = {
  x: number
  y: number
}

const Index: React.VFC<{}> = () => {
  const [image, setImage] = useState<string>()
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [crop, setCrop] = useState<Coordinate>({ x: 0, y: 0 })
  const aspect = 1
  const [isCircle, setIsCircle] = useState<boolean>(false)
  const [croppedImageIsCircle, setCroppedImageIsCircle] = useState<boolean>(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  // ローカルからイメージを追加する
  const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return
    }
    const file = event.target.files[0]
    if (file === null) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(reader.result as string)
    }
  }

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
      switchToggle.classList.remove("bg-yellow-500", "-translate-x-2")
      switchToggle.classList.add("bg-gray-700", "translate-x-full")
      setTimeout(() => {
        switchToggle.innerHTML = circleIcon
      }, 250)
    } else {
      switchToggle.classList.add("bg-yellow-500", "-translate-x-2")
      switchToggle.classList.remove("bg-gray-700", "translate-x-full")
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
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  useEffect(() => {
    setCroppedImageIsCircle(isCircle)
  }, [croppedImage])

  return (
    <div>
      <input type="file" accept="image/png, image/jpeg, image/gif" onChange={imageHandler} />

      {image != undefined ? (
        <div>
          <div className="h-64 relative">
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

          <div>Zoom</div>
          <input
            className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => {
              setZoom(parseFloat(e.currentTarget.value))
            }}
          />
          <div>Rotation</div>
          <input
            className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={(e) => {
              setRotation(parseInt(e.currentTarget.value))
            }}
          />

          <button
            className="mx-3 w-16 h-8 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
            onClick={() => switchShapeToggle()}
          >
            <div
              id="switch-toggle"
              className="w-8 h-8 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white flex justify-center items-center"
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

          <button onClick={() => cropImage()}>トリミングする</button>
          {croppedImage != undefined ? (
            <img src={croppedImage} alt="" className={croppedImageIsCircle ? "rounded-full" : ""} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Index
