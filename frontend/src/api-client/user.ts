import { Client } from "./client";
import type { IUser, IUserRequest } from "./types";

export class User extends Client {
  public user: IUser;

  constructor() {
    super();
  }

  public async getUser(id: string): Promise<IUser> {
    const user = await this.makeRequest<IUser>({
      route: "user",
      method: "get",
    });

    return user;
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
  public async login(data: IUserRequest): Promise<IUser> {
    console.log("data", data);
    this.user = await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      action: "login",
      data,
    });
    return this.user;
  }

  public async logout(): Promise<void> {
    return await this.makeRequest<void>({
      route: "auth",
      method: "post",
      action: "logout",
    });
  }

  public async addFollower(you: string, id: string): Promise<void> {
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
}
