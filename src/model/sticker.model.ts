import { Url } from "./utils"

/**
 * ステッカーモデル
 */
export type Sticker = {
  /** ステッカーのID **/
  id: string
  /** ステッカーの画像ソース **/
  source: Url
  /** 作成日時 **/
  createdAt: Date
  /** 貼ったユーザー **/
  userId: string
  /** 貼ったPC **/
  pcId: string
  /** x軸 **/
  xAxis?: string
  /** y軸 **/
  yAxis?: string
}
