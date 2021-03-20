import { Url } from "./utils"

export type Pc = {
  /** pcのID **/
  pcId: string
  /** pcの背景 **/
  backgroundType: pcBackgroundType
  /** pcの現在のイメージ画像 **/
  image?: Url
}

/**
 * PCの背景タイプ
 * 今後normalから増やす予定
 */
type pcBackgroundType = "normal"
