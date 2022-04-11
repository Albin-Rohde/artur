<script lang="ts">
  import type { IPost, IUser } from "../../api-client";
  import { Post, User } from "../../api-client";
  import Button from "../../components/Button.svelte";
  import PlusButton from "../../components/PlusButton.svelte";
  import PostCreate from "../../components/PostCreate.svelte";
  export let currentUser: IUser;
  export let onLogout: (user: IUser) => Promise<void>;
  const scrollY = document.body.style.top;
  let postCreation = "";
  let post_description: string;
  let post_title: string;
  let file: FileList;
  let posts: IPost[] = [];

  const user = new User();

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

  const uploadAvatar = async () => {
    const avatar = await user.uploadAvatar(file[0]);
    console.log(avatar);
  };

  (async () => {
    console.log("currentUser", currentUser);
    console.log("hello");
    const postClient = new Post();
    posts = await postClient.getFeed("time");
    console.log(posts);
  })();
</script>

<h1>Dethär är din dashboard.</h1>
<h2>Hej {currentUser.name}.</h2>

<Button onClick={() => onLogout(currentUser)} text="Logout" />

{#if postCreation === "Visible"}
  <PostCreate onClick={() => hidePostCreate()} {currentUser} />
{:else}
  <PlusButton onClick={() => showPostCreate()} />
{/if}

<div class="feedContainer">
  <input type="file" bind:files={file} />
  <button on:click|preventDefault={() => uploadAvatar()}>Click me</button>
  <div class="feed">
    {#if posts.length > 0}
      {#each posts as post}
        <div
          style="background-image: url({post.photoUrl});background-size: auto; background-repeat: no-repeat;"
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
