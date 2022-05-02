<script lang="ts">
  import type { IUser } from "../api-client";

  export let currentUser: IUser;
</script>

<br />
<div class="profileContainer">
  <div class="profile">
    {#if !currentUser.avatar}
      <div class="defaultProfile">
        <img src="assets/avatar.png" alt="" />
      </div>
    {:else}
      <div class="profilePicture">
        <img src={currentUser.avatar} alt="" />
      </div>
    {/if}
    <div class="profileMain">
      <h2>{currentUser.name}</h2>

      <textarea readonly class="bio">{currentUser.bio}</textarea>
    </div>
  </div>
</div>

<style>
  textarea {
    resize: none;
  }

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
  .defaultProfile {
    grid-column: 2/4;
  }
  .defaultProfile > img {
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
    background-size: cover;
  }

  .profilePicture > img {
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
    background-size: cover;
  }
  .profileMain {
    grid-column: 5/13;
  }
  .bio {
    height: 10vh;
    width: 100%;
    border: none;
    outline: none;
  }
</style>
