export interface CurrentUser {
  uid: string
  displayName: string
  imagePath: string
}

export interface PostData {
  post: string
  user: CurrentUser
  created_at: string
}
