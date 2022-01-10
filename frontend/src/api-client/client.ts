import { InternalServerError } from ".";

type HttpMethods = "get" | "put" | "post" | "delete";

type HttpRoutes = "auth" | "feed" | "posts" | "user";

interface RestRequestOptions {
  method: HttpMethods;
  route: HttpRoutes;
  data?: FormData | {};
  action?: string;
  query?: string;
  type?: "json" | "formData";
}

export class Client {
  private readonly baseUrl: string = "http://localhost:666";

  public async makeRequest<T>({
    method,
    route,
    data,
    action,
    query,
    type = "json",
  }: RestRequestOptions): Promise<T> {
    console.log(method, route, data, action, query);
    try {
      action = action ? `/${action}` : "";
      query = query === undefined ? "" : `?${query}`;
      console.log(`${this.baseUrl}/${route}${action}${query}`);
      console.log("base url", this.baseUrl);
      const res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
        method,
        headers: {
          "Content-Type":
            type === "json" ? "application/json" : "multipart/form-data",
          "Access-Control-Allow-Origin": this.baseUrl,
        },
        body:
           type === "json" ? JSON.stringify(data) : (data as FormData),
        credentials: "include",
      });
      const resBody = await res.json();
      if (!resBody) {
        throw new InternalServerError("No data in response");
      }
      if (!res.ok) {
        throw new InternalServerError(resBody);
      }
      return resBody;
    } catch (error) {
      console.error("we got an error!");
      throw new InternalServerError(error);
    }
  }
}
