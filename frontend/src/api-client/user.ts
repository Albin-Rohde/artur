import { Client } from "./client";
import { InternalServerError } from "./errors";
import type { IUser, IUserRequest } from "./types";

export class User extends Client {
  public user: IUser;

  constructor() {
    super();
  }

  public async register(data: IUserRequest): Promise<IUser> {
    console.log("data", data);
    const user = await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      action: "register",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      },
    });
    if (typeof user === "string") {
      throw new InternalServerError(user);
    }
    return user;
  }
  public async login(data: IUserRequest): Promise<IUser> {
    console.log("data", data);
    const user = await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      action: "login",
      data,
    });
    if (typeof user === "string") {
      throw new InternalServerError(user);
    }
    return user;
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
  }): Promise<IUser> {
    const user = await this.makeRequest<IUser>({
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
    if (typeof user === "string") {
      throw new InternalServerError(user);
    }
    return user;
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

  public async changeDisplayName(displayName: string): Promise<string> {
    return this.makeRequest({
      route: "user",
      method: "post",
      action: "changeDisp",
      data: {
        displayName,
      },
    });
  }
}
