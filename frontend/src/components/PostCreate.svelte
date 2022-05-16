<script lang="ts">
  import Dropzone from "svelte-atoms/DropZone.svelte";
  import type { IUser } from "../api-client";
  import { Post } from "../api-client";
  export let currentUser: IUser;
  export let onClick: (...a: any) => any;

  let post_description: string;
  let post_title: string;
  let file: File;
  let file_name: string;

  let reader = new FileReader();
  const post = new Post();
  (async () => {
    console.log("hello");
    const posts = await post.getFeed("color");
    console.log(posts);
  })();
  const upload = async () => {
    console.log(post_description, post_title, file[0]);
    const p = await post.upload({
      post_description,
      post_title,
      file: file,
    });
    console.log(p);
    window.location.replace("/");
  };
  let image;

  const fileChose = (e) => {
    console.log(e.dataTransfer.files);
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
</script>

<div class="background" on:click|preventDefault={onClick} />
<div class="container">
  <form class="form" action="">
    <textarea
      class="title"
      type="text"
      name="title"
      bind:value={post_title}
      placeholder="Title"
    />
    <textarea
      class="description"
      type="text"
      name="content"
      bind:value={post_description}
      placeholder="Content"
    />
    <!-- <Dropzone on:drop={fileChose} /> -->
    {#if image}
      <img src={image} alt="hello" class="file" />
    {:else}
      <div class="drop">
        <Dropzone
          fileTitle={file_name}
          dropOnPage={true}
          on:drop={fileChose}
          on:change={fileChose}
        />
      </div>
    {/if}
    <button class="knapp" on:click|preventDefault={() => upload()}
      >{"Create Post"}
    </button>
    <button class="close" on:click|preventDefault={onClick}>Cancel</button>
  </form>
</div>

<style>
  textarea {
    resize: none;
  }

  .drop {
    grid-row: 2/12;
    grid-column: 2/7;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5%;
  }

  .background {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(32, 32, 32, 0.7);
    z-index: 10;
  }
  .container {
    position: fixed;
    left: 15%;
    width: 90vw;
    height: 90vh;
    bottom: 5%;
    margin: 0 auto;
    border-radius: 100px;

    background-color: #add5a9;
    z-index: 20;
  }
  .form {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }

  .title {
    grid-row: 2/3;
    grid-column: 8/11;
    background-color: white;
    border-radius: 30px;
    padding: 1rem;
  }
  .description {
    grid-row: 3/6;
    grid-column: 8/11;
    background-color: white;
    border-radius: 30px;
    padding: 1rem;
  }
  .file {
    width: 100%;
    height: 100%;
    grid-row: 2/12;
    grid-column: 2/7;
    background-color: white;
    border-radius: 2%;
  }
  .knapp {
    overflow: visible;
    position: absolute;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: white;
    bottom: 5%;
    right: 17%;
    width: 10%;
    height: 5%;
  }
  .knapp:hover,
  .close:hover {
    background: rgb(219, 219, 219);
  }
  .knapp:focus,
  .close:focus {
    background: #777676;
  }
  .close {
    overflow: visible;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: white;
    height: 5%;
    width: 10%;
    bottom: 5%;
    right: 28%;
    cursor: pointer;
    fill: #97445e;
  }
</style>
