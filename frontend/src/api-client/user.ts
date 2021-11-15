import { Client } from "./client";
import { IUser, IUserRequest } from "./types";

export class User extends Client {
  constructor() {
    super();
  }
  public async register(data: IUserRequest): Promise<IUser> {
    return await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      action: "register",
    });
  }
  public async login(data: IUserRequest): Promise<IUser> {
    return await this.makeRequest<IUser>({
      route: "auth",
      method: "post",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      action: "login",
    });
  }

  public async logout(): Promise<void> {
    return await this.makeRequest<void>({
      route: "auth",
      method: "post",
      action: "logout",
    });
  }

  public async addFollower(you:string,id: string): Promise<void> {
    return await this.makeRequest<void>({
      route: "user",
      method: "post",
      data: {
        follower_id: id,
      },
      action: `follower/${you}`,
    });
  }

  // TODO: please fix this in backend
  // public async bio


  public async getSession(): Promise<IUser> {
    return await this.makeRequest<IUser>({
      route: "user",
      method: "get",
    });
  }
}
