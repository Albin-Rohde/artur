import { Client } from "./client";
import { IPost, IPostRequest } from "./types";

export class Post extends Client {
  constructor() {
    super();
  }

  public async Upload(post: IPostRequest): Promise<string> {
    const formData = new FormData();
    formData.append("image", post.file);
    const id = await this.makeRequestWithFormData<string>({
      route: "posts",
      method: "post",
      data: formData,
      action: "upload",
    });
    return await this.makeRequest<string>({
      route: "posts",
      method: "get",
      data: {
        post_description: post.post_description,
        post_title: post.post_title,
      },
      action: `create/${id}`,
    });
  }

  public async getFeed(query: string): Promise<IPost[]> {
    return await this.makeRequest<IPost[]>({
      route: "feed",
      method: "get",
      query,
    });
  }
}
