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
    <div className="App">
      <button onClick={() => interact.enable()} className={"m-1 p-1 bg-red-400 rounded text-white"}>
        編集
      </button>
      <button
        onClick={() => interact.disable()}
        className={"m-1 p-1 bg-blue-400 rounded text-white"}
      >
        保存
      </button>
      <input type="file" name="photo" id="file" accept="image/*" onChange={handleChangeFile} />
      <div>
        (x, y) = ({interact.position.x}, {interact.position.y})
      </div>
      {console.log(interact.position)}
      <img
        ref={interact.ref}
        src={preview}
        style={{
          ...interact.style
        }}
      />
      <img
        src={
          "https://www.nojima.co.jp/support/wp-content/uploads/2020/09/347091c6d5762a65daa20996977c6d10.jpg"
        }
        className={"m-auto h-2/3 w-2/3"}
      />
    </div>
  )
}

export default Index
