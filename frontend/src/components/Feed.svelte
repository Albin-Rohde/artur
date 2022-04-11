<script lang="ts">
  import type { IPost, IUser } from "../api-client";
  import { Post } from "../api-client";
  import type { PostSortString } from "../api-client/types";
  export let feedType: PostSortString;
  let post_description: string;
  let post_title: string;
  let posts: IPost[] = [];

  (async () => {
    console.log("hello");
    const postClient = new Post();
    posts = await postClient.getFeed(feedType);
    console.log(posts);
  })();
</script>

<div class="feedContainer">
  <div class="feed">
    {#if posts.length > 0}
      {#each posts as post}
        <div
          style="background-image: url({post.photoUrl});background-size: contain; background-repeat: no-repeat;"
        />
      {/each}
    {/if}
  </div>
  <!--<input type="text" name="search" bind:value={search} on:input={() => {searchUser()}}  WIP: -->
</div>

<style>
  .feedContainer {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  .feed {
    grid-column: 3/11;
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1%;
    /* grid-auto-rows: minmax(50px, auto); */
  }
  .feed div {
    width: 100%;
    height: 200px;
    /*background-color: #d6a7bd;*/
  }
</style>
