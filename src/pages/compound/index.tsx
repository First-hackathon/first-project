import React, { useState } from "react"
import { useInteractJS } from "../../hooks"

const Index: React.FC = () => {
  const interact = useInteractJS()
  const [preview, setPreview] = useState("")
  const handleChangeFile = (e) => {
    const { files } = e.target
    setPreview(window.URL.createObjectURL(files[0]))
  }

  return (
    <div className={"flex"}>
      <div className={"w-1/4"}>
        <button
          onClick={() => interact.enable()}
          className={"m-1 p-1 bg-red-400 rounded text-white"}
        >
          編集
        </button>
        <button
          onClick={() => {
            interact.disable()
          }}
          className={"m-1 p-1 bg-blue-400 rounded text-white"}
        >
          保存(固定)
        </button>
        <input type="file" name="photo" id="file" accept="image/*" onChange={handleChangeFile} />
        <div>
          (x, y) = ({interact.position.x}, {interact.position.y})
        </div>
        <div>あなたのステッカー欄</div>
        <img
          ref={interact.ref}
          src={preview}
          style={{
            ...interact.style
          }}
        />
      </div>
      <div className={"w-3/4"}>
        <img
          src={"https://img1.kakaku.k-img.com/images/productimage/fullscale/K0001158507_0004.jpg"}
          className={"m-auto h-3/4"}
        />
      </div>
    </div>
  )
}

export default Index
