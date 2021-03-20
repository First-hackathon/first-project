import React, { useEffect, useState } from "react"
import { useInteractJS } from "../../hooks"
const Images = require("../../public/pc.jpg")
// const Images = require("../../public/pc.svg")

const Index: React.FC = () => {
  const interact = useInteractJS()
  const [preview, setPreview] = useState("")
  const handleChangeFile = (e) => {
    const { files } = e.target
    setPreview(window.URL.createObjectURL(files[0]))
  }
  // contextを状態として持つ
  const [context, setContext] = useState(null)
  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(() => {
    const canvas = document.getElementById("canvas")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
  })
  // 状態にコンテキストが登録されたらそれに対して操作できる
  useEffect(() => {
    if (context !== null) {
      const img = new Image()
      img.src = Images
      img.onload = () => {
        // PCを描画
        context.drawImage(img, 0, 0)
      }
    }
  }, [context])

  // ステッカーをPCに貼り付け
  const saveCanvas = (preview) => {
    const img = new Image()
    img.src = preview
    img.onload = () => {
      context.drawImage(
        img,
        interact.position.x,
        interact.position.y,
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

  return (
    <>
      <img
        ref={interact.ref}
        src={preview}
        style={{
          ...interact.style
        }}
      />
      <canvas width="904" height="600" id="canvas"></canvas>
      <button onClick={() => interact.enable()} className={"m-1 p-1 bg-red-400 rounded text-white"}>
        編集
      </button>
      <button
        onClick={() => {
          interact.disable()
          saveCanvas(preview)
        }}
        className={"m-1 p-1 bg-blue-400 rounded text-white"}
      >
        保存(固定)
      </button>
      <input type="file" name="photo" id="file" accept="image/*" onChange={handleChangeFile} />
      <button
        onClick={() => {
          downloadCanvas()
        }}
        className={"m-1 p-1 bg-green-400 rounded text-white"}
      >
        ダウンロード
      </button>
      <div>
        (x, y) = ({interact.position.x}, {interact.position.y})
      </div>
      <a id="download-link"></a>
    </>
  )
}

export default Index
