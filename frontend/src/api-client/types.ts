export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  displayName: string;
  bio: string;
  followers: string[];
  avatar: string | null;
}

export interface IPost {
  id: string;
  title: string;
  photoUrl: string;
  description: string;
  createdAt: string;
  color: string;
}

export interface IUserRequest {
  email: string;
  password: string;
  name?: string;
  displayName?: string;
}

export interface IPostRequest {
  post_description: string | null;
  post_title: string | null;
  file: File | null;
}

export type PostSortString = "color" | "likes" | "follower" | "time";
