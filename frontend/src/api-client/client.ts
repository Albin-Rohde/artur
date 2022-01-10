import axios from "axios";
import { InternalServerError } from ".";

type HttpMethods = "get" | "put" | "post" | "delete";

type HttpRoutes = "auth" | "feed" | "posts" | "user";

interface RestRequestOptions {
  method: HttpMethods;
  route: HttpRoutes;
  data?: Record<any, any>;
  action?: string;
  query?: string;
}

export class Client {
  private readonly baseUrl: string = "http://localhost:5000";

  public async makeRequest<T>({
    method,
    route,
    data,
    action,
    query,
  }: RestRequestOptions): Promise<T> {
    console.log(method, route, data, action, query);
    try {
      action = action ? `/${action}` : "";
      query = query === undefined ? "" : `?${query}`;
      console.log(`${this.baseUrl}/${route}${action}${query}`);
      const res = await (
        await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": this.baseUrl,
          },
          body: JSON.stringify(data),
          credentials: "include",
        })
      )
        .json()
        .catch((e) => {
          throw new InternalServerError(e);
        });

      console.log(res);

      if (!res) {
        throw new InternalServerError("No data in response");
      }
      return res;
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  public async makeRequestWithFormData<T>({
    method,
    route,
    data,
    action,
    query,
  }: RestRequestOptions): Promise<T> {
    try {
      action = action ? `/${action}` : "";
      query = query ? `?${query}` : "";
      const res = await axios({
        withCredentials: true,
        url: `${this.baseUrl}/${route}/${action}${query}`,
        method,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": this.baseUrl,
        },
        data,
      }).then((r) => r.data);
      if (!res.ok) {
        throw new InternalServerError(res);
      }
      return res;
    } catch (error) {
      throw new InternalServerError(error);
    }
  }
}
