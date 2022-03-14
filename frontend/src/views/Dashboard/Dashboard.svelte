<script lang="ts">
  import type { IUser } from "../../api-client";
  import { Post, User } from "../../api-client";
  import type { IPost } from "../../api-client";
  import PlusButton from "../../components/PlusButton.svelte";
  import Button from "../../components/Button.svelte";
  import PostCreate from "../../components/PostCreate.svelte";
  import Feed from "../../components/Feed.svelte";
  export let currentUser: IUser;
  export let onLogout: (u: IUser) => Promise<void>;
  console.log(currentUser);
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
    console.log(file[0]);
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

<Feed feedType="time" />
