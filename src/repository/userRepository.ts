import { User } from "../model/user.model"
import { auth, firestore } from "../utils/firebase"

/**
 * 新規ユーザー登録
 * @param user: ユーザー情報
 */
export const createUser = async (user: User): Promise<void> => {
  const authUid = auth.currentUser.uid
  const userRef = firestore.collection("user").doc(authUid)
  await userRef.set(user)
}

/**
 * ユーザー更新
 * @param user: 更新予定のユーザー情報
 * 値の更新、値の追加をこのメソッドで行う
 */

export const updateUser = async (user: User): Promise<void> => {
  const authUid = auth.currentUser.uid
  const userRef = firestore.collection("user").doc(authUid)
  await userRef.set(user, { merge: true })
}

/**
 * ユーザーデータの取得
 * @return ユーザーのデータ
 */
export const getUser = async (): Promise<User> => {
  const authUid = auth.currentUser.uid
  const userRef = firestore.collection("user").doc(authUid)
  const userData = await userRef.get()
  return userData.data() as User
}
