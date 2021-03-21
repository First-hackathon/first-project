import React, { useEffect, useState } from "react"
import { useInteractJS } from "../../hooks"
import { RoundedButton, RoundedDivSize } from "../../components/Button/RoundButton"
import NextImage from "next/image"
import { Toast, ToastType } from "../../components/toast"
import { auth } from "../../utils/firebase"
import Header from "../../components/header"
import { Footer } from "../../components/Footer"
import { useRecoilState, useRecoilValue } from "recoil"
import { stickerState } from "../../atom/sticker"
import { useRouter } from "next/router"

const Index: React.VFC<{}> = () => {
  //TODO: FIXME
  const sticker = useRecoilValue(stickerState)
  const router = useRouter()
  const [toastMessage, setToastMessage] = useState<string>("")
  const [toastType, setToastType] = useState<ToastType>(ToastType.Notification)
  const [toastState, setToastState] = useState<boolean>(false)

  useEffect(() => {
    if (router.query.settlement) {
      setToastType(ToastType.Notification)
      setToastMessage("決済が完了しました")
      setToastState(true)
    }
  }, [])

  useEffect(() => {
    console.log(auth.currentUser)
  })

  const interact = useInteractJS()
  const [preview, setPreview] = useState("/logo/logo.svg")
  const handleChangeFile = (e) => {
    const { files } = e.target
    setPreview(window.URL.createObjectURL(files[0]))
  }
  // contextを状態として持つ
  const [context, setContext] = useState(null)
  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
  })

  useEffect(() => {
    console.log(sticker)
  }, [])

  const createImage = (url) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.addEventListener("load", () => {
        context.drawImage(image, 0, 0)
        resolve(image)
      })
      image.addEventListener("error", (error) => reject(error))
      image.setAttribute("crossOrigin", "anonymous") // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    })
  // 状態にコンテキストが登録されたらそれに対して操作できる
  useEffect(() => {
    ;(async () => {
      if (context !== null) {
        const img = await createImage("/image/stickers-pc.png")
      }
    })()
  }, [context])

  // ステッカーをPCに貼り付け
  const saveCanvas = (preview) => {
    let e = document.getElementById("canvas")
    const canvasWidth = parseFloat(window.getComputedStyle(e).width)
    const canvasHeight = parseFloat(window.getComputedStyle(e).height)

    const img = new Image()
    img.src = preview
    img.onload = () => {
      let e = document.getElementById("scope")
      const scopeWidth = parseFloat(window.getComputedStyle(e).width)

      const diff = (interact.width - scopeWidth) / 2
      context.drawImage(
        img,
        (interact.position.x * 816) / canvasWidth - diff,
        (interact.position.y * 571) / canvasHeight - diff,
        interact.width,
        interact.height
      )
    }
  }

  const downloadCanvas = () => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
    const url = canvas.toDataURL()
    const link = document.createElement("a")
    link.download = "sticker.png"
    link.href = url
    link.click()
  }

  const uploadCanvas = () => {
    // TODO: ストレージにあげる
  }

  const previewOnClick = async () => {
    await createImage("/image/stickers-pc.png")
    interact.disable()
    saveCanvas(preview)
    interact.enable()
  }

  const saveOnClick = () => {
    uploadCanvas()
    router.push("/supporters")
  }

  return (
    <>
      <Toast
        type={toastType}
        text={toastMessage}
        isShow={toastState}
        isShowSetter={setToastState}
      />
      <Header />
      <section className="mt-32 mb-20">
        <div className="container mx-auto">
          <div>
            <h2 className="font-bold text-3xl p-5 text-center">ステッカーを貼ろう</h2>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-2/3 mb-8">
              <div className="">
                <div className="aspect-w-816 aspect-h-571 relative">
                  <div className="xl:w-20 xl:h-20 lg:w-16 lg:h-16 w-14 h-14 flex items-center justify-center">
                    <img
                      id="scope"
                      ref={interact.ref}
                      src={"/icon/scope.svg"}
                      style={{
                        ...interact.style
                      }}
                      className="relative z-10"
                    />
                  </div>

                  <canvas width={816} height={571} className="absolute z-0" id="canvas" />
                </div>
              </div>
            </div>

            <div className="w-10 h-10">
              <NextImage src={"/icon/arrow-pink.svg"} width={80} height={80} />
            </div>

            <div className="shadow-lg rounded-lg relative w-32 h-32 flex items-center justify-center">
              <div className="w-20 h-20 m-auto">
                <img src={preview} width={80} height={80} />
              </div>
            </div>
          </div>

          <div>
            <div className="xl:w-1/3 lg:w-1/2 md:w-2/3 w-full mx-auto ">
              <div className="text-md text-sm text-center mb-4">
                <p>ポインターを移動して貼る場所を決定します。</p>
              </div>

              <div className="mb-4">
                <RoundedButton
                  size={RoundedDivSize.M}
                  onClick={() => previewOnClick()}
                  text={"プレビュー"}
                />
              </div>

              <RoundedButton size={RoundedDivSize.M} onClick={() => saveOnClick()} text={"決定"} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Index
