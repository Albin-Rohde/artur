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
  private readonly baseUrl: string = process["env"]["SERVER_URL"];

  public async makeRequest<T>({
    method,
    route,
    data,
    action,
    query,
    type = "json",
  }: RestRequestOptions): Promise<T> {
    console.log(process);
    console.log(this.baseUrl);
    console.log(method, route, data, action, query);
    try {
      action = action ? `/${action}` : "";
      query = query === undefined ? "" : `/?type=${query}`;
      console.log(`${this.baseUrl}/${route}${action}${query}`);
      console.log("base url", this.baseUrl);
      let res;
      if (type === "json") {
        res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `${process["env"]["FRONT_URL"]}${process["env"]["FRONT_PORT"]}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
      } else if (type === "formData") {
        res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Access-Control-Allow-Origin": `${process["env"]["FRONT_URL"]}${process["env"]["FRONT_PORT"]}`,
          },
          body: data as FormData,
          credentials: "include",
        });
      }
      console.log("res", res);
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
