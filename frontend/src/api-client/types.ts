export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  followers: string[];
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
}

export interface IPostRequest {
  post_description?: string;
  post_title?: string;
  file?: File;
}
