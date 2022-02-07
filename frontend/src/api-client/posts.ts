import { Client } from "./client";
import type { IPost, IPostRequest, PostSortString } from "./types";
import {InternalServerError} from './errors'

type PostResponse = {
  msg: string
  posts: IPost[]
}

export class Post extends Client {
  constructor() {
    super();
  }

  public async upload(post: IPostRequest): Promise<string> {
    const formData = new FormData();
    formData.append("image", post.file);
    console.log("formData", formData);
    const id = await this.makeRequest<string>({
      route: "posts",
      method: "post",
      data: formData,
      action: "upload",
      type: "formData",
    });

    if(!id) {
      throw new InternalServerError("No id in response")
    }

    return await this.makeRequest<string>({
      route: "posts",
      method: "post",
      data: {
        post_description: post.post_description,
        post_title: post.post_title,
      },
      action: `create/${id}`,
      type: "json",
    });
  }

  public async getFeed(query: PostSortString): Promise<IPost[]> {
    return await this.makeRequest<PostResponse>({
      route: "feed",
      method: "get",
      query,
    }).then(r => r.posts);
  }
}
