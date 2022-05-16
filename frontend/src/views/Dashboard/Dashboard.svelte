<script lang="ts">
  import type { IUser } from "../../api-client";
  import { Post, User } from "../../api-client";
  import type { IPost } from "../../api-client";
  import PlusButton from "../../components/PlusButton.svelte";
  import Button from "../../components/Button.svelte";
  import PostCreate from "../../components/PostCreate.svelte";
  import Feed from "../../components/Feed.svelte";
  import type { PostSortString } from "../../api-client/types";
  export let currentUser: IUser;
  export let onLogout: (u: IUser) => Promise<void>;
  console.log(currentUser);
  const scrollY = document.body.style.top;
  let postCreation = "";
  let file: FileList;
  let posts: IPost[] = [];
  let feedType: PostSortString = "time";
  const user = new User();
  const feedTypes = ["time", "color", "follower", "likes"];

  const setFeedType = (e) => {
    feedType = feedTypes[e.target.options.selectedIndex] as PostSortString;
    console.log(feedType);
  };

  const showPostCreate = () => {
    postCreation = "Visible";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };
  const hidePostCreate = () => {
    postCreation = "";
    document.body.style.position = "";
    document.body.style.top = "";
  };
</script>

{#if postCreation === "Visible"}
  <PostCreate onClick={() => hidePostCreate()} {currentUser} />
{:else}
  <PlusButton onClick={() => showPostCreate()} />
{/if}
<div class="feedTypeContainer">
  <label for="feedType" id="feedTypeLabel">Feed Sorting</label>
  <select name="feedType" id="feedType" on:change={setFeedType}>
    <option value="time">Time</option>
    <option value="color">Color</option>
    <option value="follower">Follower</option>
    <option value="likes">Likes</option>
  </select>
</div>
<Feed {feedType} />

<style>
  .feedTypeContainer {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  #feedType {
    grid-column: 10/11;
  }
  #feedTypeLabel {
    justify-self: end;
    align-self: center;
    font-size: 1.2rem;
    grid-column: 9/10;
  }
</style>
