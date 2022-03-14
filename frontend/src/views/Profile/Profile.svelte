<script lang="ts">
  import Feed from "../../components/Feed.svelte";
  import type { IPost, IUser } from "../../api-client";
  import PostCreate from "../../components/PostCreate.svelte";
  import PlusButton from "../../components/PlusButton.svelte";
  export let currentUser: IUser;
  export let onLogout: () => Promise<void>;
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

<br />
<div class="profileContainer">
  <div class="profile">
    <div class="profilePicture">
      <div />
    </div>
    <div class="profileMain">
      <h2>{currentUser.name}</h2>

      <p>
        Hi! I'm Many. <br />
        {currentUser.bio}
        xe/xim <br />
        Blue Lives Matter
      </p>
    </div>
  </div>
</div>
<br />

{#if postCreation === "Visible"}
  <PostCreate onClick={() => hidePostCreate()} {currentUser} />
{:else}
  <PlusButton onClick={() => showPostCreate()} />
{/if}

<Feed feedType="time" />

<style>
  .profileContainer {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  .profile {
    height: 15vh;
    grid-column: 3/11;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  .profilePicture {
    grid-column: 2/4;
  }

  .profilePicture > div {
    width: 15vh;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-image: url("https://preview.redd.it/1nox7mat7l781.jpg?auto=webp&s=89ccd4638a8c1452c0000bd884d18e0366ee1232");
  }

  .profileMain {
    grid-column: 5/13;
  }
</style>
