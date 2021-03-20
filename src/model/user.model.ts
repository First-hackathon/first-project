import { Url } from "./utils"
import { Pc } from "./pc.model"

/**
 * Userモデル
 */
export type User = {
  /** ユーザーID **/
  userId: string
  /** ユーザー名 **/
  userName: string
  /** プロフィール **/
  profile?: string
  /** サムネイル画像のURL **/
  thumbnail: Url
  /** ストライプカスタマーID（ファン用 -> これがあれば今までに一回以上は払ったことがある） **/
  stripeCustomerId?: string
  /** ストライプアカウントID（クリエイター用） **/
  stripeAccountId?: string
  /** クリエイター用のPC（あればクリエイター） **/
  pc?: Pc
}
