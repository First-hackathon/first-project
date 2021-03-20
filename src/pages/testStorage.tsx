import React, { useState } from "react"
import { storage } from "../utils/firebase"

const TestStorage: React.FC = () => {
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState()

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const image = event.target.files[0]
    setImage(image)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(percent + "% done")
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((sourceUrl) => {
              // TODO: ここでとってきたURLをDBに入れる
              setImageUrl(sourceUrl)
            })
        }
      )
    } else {
      console.log("ファイルが選択されていません")
    }
  }

  return (
    <div className="App">
      <h1>画像アップロード</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button>Upload</button>
      </form>
      <img src={imageUrl} alt="uploaded" />
    </div>
  )
}

export default TestStorage
