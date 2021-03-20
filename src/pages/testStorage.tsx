import React, { useState } from "react"
import { storage } from "../utils/firebase"

const TestStorage: React.FC = () => {
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState()
  const [objUrl, setObjectUrl] = useState<string>()

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const image = event.target.files[0]
    // TODO: ここのtypeをみて、動画やpdfなどの写真以外のファイルを判別できる
    console.log(image.type)
    setImage(image)

    // ローカルでファイルに対してURLを生成
    const objectUrl = window.URL.createObjectURL(image)
    setObjectUrl(objectUrl)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    if (image) {
      // アップロード
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      // アップロード段階でフックさせて処理を実行
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
      <h1>画像アップロードテストページ</h1>
      <img src={objUrl} alt="画像" />
      <br />
      <p>上の画像はファイルが選択された時の画像（ローカルで保持している）</p>
      <br />
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button className="bg-blue-600 text-white">アップロードする</button>
      </form>
      <br />
      <img src={imageUrl} alt="uploaded" />
      <br />
      <p>上の画像はstorageにアップロードされたものをurlで表示させている</p>
      <br />
      <br />
      <br />
      <a href={imageUrl} download>
        この画像をダウンロードする
      </a>
    </div>
  )
}

export default TestStorage
