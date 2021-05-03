export type PostsType = {
    id: number
    post: string
    likeCount: number | 0
  }
  
export type ContactsProfileType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type PhotosProfileType = {
  small: string | null
  large: string | null
}

export type ProfileType = {
  userId: number | null
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string | null
  contacts: Array<ContactsProfileType>
  photos: Array<PhotosProfileType>
}

export type UserType = {
    name: string
    id: number
    photos: Array<PhotosProfileType>
    status: string | null
    followed: boolean
  }