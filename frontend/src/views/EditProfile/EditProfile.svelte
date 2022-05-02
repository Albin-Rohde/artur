<script lang="ts">
  import { User } from "../../api-client";
  import type { IUser } from "../../api-client";
  import ProfileContainer from "../../components/ProfileContainer.svelte";
  import Dropzone from "svelte-atoms/DropZone.svelte";
  export let currentUser: IUser;

  let profile_description: string = currentUser.bio;
  let profile_name: string = currentUser.name;
  let file: File;
  let file_name: string;
  let image;

  const user = new User();

  let reader = new FileReader();
  const uploadAvatar = async () => {
    console.log(file);
    const avatar = await user.uploadAvatar(file);
    console.log(avatar);
  };
  const fileChose = (e) => {
    const f = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(f);
    if (f) {
      reader.addEventListener("load", () => {
        image = reader.result;
      });
      reader.readAsDataURL(f);
      file = f;
      file_name = f.name;
    }
  };
  const upload = async () => {
    console.log(profile_description, profile_name, file[0]);
    uploadAvatar();
    user.bio(profile_description);
  };
</script>

<ProfileContainer {currentUser} />
<br />
<div class="formContainer">
  <form class="form" action="">
    {#if image}
      <img src={image} alt="hello" class="file" />
    {:else}
      <div class="drop">
        <Dropzone
          class="drop"
          fileTitle={file_name}
          dropOnPage
          on:drop={fileChose}
          on:change={fileChose}
        />
      </div>
    {/if}

    <textarea
      class="name"
      type="text"
      name="name"
      bind:value={profile_name}
      placeholder="Name"
    />
    <textarea
      class="description"
      type="text"
      name="content"
      bind:value={profile_description}
      placeholder="Content"
    />
    <button class="knapp" on:click|preventDefault={() => upload()}
      >{"Save Changes"}</button
    >
  </form>
</div>

<style>
  .formContainer {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(150, auto);
  }

  .form {
    height: 100%;
    grid-column: 3/11;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }
  .name {
    grid-row: 1/2;
    grid-column: 8/13;
    background-color: white;
    border-radius: 30px;
    padding: 1rem;
  }

  .description {
    grid-row: 2/4;
    grid-column: 8/13;
    background-color: white;
    border-radius: 30px;
    padding: 1rem;
  }
  textarea {
    resize: none;
  }
  .drop {
    grid-column: 2/5;
    grid-row: 1/4;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid gray 1px;
    border-radius: 30px;
  }
  .file {
    width: 15vh;
    height: 15vh;
    grid-row: 2/4;
    grid-column: 2/4;

    background-color: white;
    border-radius: 50%;
    background-size: cover;
  }
  .knapp {
    grid-row: 4/5;
    grid-column: 8/13;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #add5a9;
    width: 8vw;
    height: 3vh;
    justify-self: right;
  }
  .knapp:hover {
    background: #96cb92;
  }
  .knapp:focus {
    background: #d6a7b4;
  }
</style>
