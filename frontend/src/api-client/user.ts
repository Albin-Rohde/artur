import { Client } from "./client";
import type { IUser, IUserRequest } from "./types";

export class User extends Client {
  public user: IUser;

  constructor() {
    super();
  }

  public async register(data: IUserRequest): Promise<IUser> {
    console.log("data", data);
    this.user = await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      action: "register",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return this.user;
  }
  public async login(data: IUserRequest): Promise<IUser | string> {
    console.log("data", data);
    this.user = await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      action: "login",
      data,
    });
    return this.user;
  }

  public async socialLogin({
    name,
    email,
    avatar,
    provider,
  }: {
    name: string;
    email: string;
    avatar: string;
    provider: "github" | "google";
  }): Promise<IUser | string> {
    this.user = await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      action: "social-login",
      data: {
        name,
        email,
        avatar,
        provider,
      },
    });
    console.log("user 222222", this.user);
    return this.user;
  }

  public async logout(): Promise<void> {
    return await this.makeRequest<void>({
      route: "auth",
      method: "post",
      action: "logout",
    });
  }

  public async addFollower(id: string): Promise<void> {
    return await this.makeRequest<void>({
      route: "user",
      method: "post",
      data: {
        follower_id: id,
      },
      action: `follower/`,
    });
  }

  // TODO: please fix this in backend
  public async bio(bio: string): Promise<void> {
    return await this.makeRequest<void>({
      route: "user",
      method: "post",
      action: "bio",
      data: {
        bio,
      },
    });
  }

  public async search(query: string): Promise<IUser[]> {
    return await this.makeRequest<IUser[]>({
      route: "user",
      method: "post",
      type: "json",
      action: "search",
      data: {
        query,
      },
    });
  }

  public async getSession(): Promise<IUser> {
    this.user = await this.makeRequest<IUser>({
      route: "user",
      method: "get",
    });
    return this.user;
  }

  public async uploadAvatar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("avatar", file);
    const id = await this.makeRequest<string>({
      route: "user",
      method: "post",
      data: formData,
      action: "upload",
      type: "formData",
    });
    return id;
  }
}
