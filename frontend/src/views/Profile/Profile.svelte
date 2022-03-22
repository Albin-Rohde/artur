<script lang="ts">
  import Feed from "../../components/Feed.svelte";
  import type { IPost, IUser } from "../../api-client";
  import PostCreate from "../../components/PostCreate.svelte";
  import PlusButton from "../../components/PlusButton.svelte";
  import ProfileContainer from "../../components/ProfileContainer.svelte";
  export let currentUser: IUser;
  export let onLogout: (u: IUser) => Promise<void>;
  let postCreation = "";
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

<ProfileContainer {currentUser} />
<br />
<br />
{#if postCreation === "Visible"}
  <PostCreate onClick={() => hidePostCreate()} {currentUser} />
{:else}
  <PlusButton onClick={() => showPostCreate()} />
{/if}

<Feed feedType="time" />

<style>
</style>
