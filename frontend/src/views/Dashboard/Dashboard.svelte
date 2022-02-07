<script lang="ts">
    import type { IUser } from "../../api-client";
    import { Post } from '../../api-client';
    import Button from "../../components/Button.svelte";


export let currentUser: IUser;
export let onLogout: () => Promise<void>
    let post_description: string;
    let post_title: string;
    let file: FileList;

const post = new Post();


(async ()=> {
    console.log("hello")
    const posts = await post.getFeed('color')
    console.log(posts)

})()

window.onload = async () => {
}

const upload = async () => {
    console.log(post_description, post_title, file[0]);
    const p =  await post.upload({
        post_description,
        post_title,
        file: file[0]
    })
    console.log(p)
}

</script>

<div class="feedContainer">
    <div class="feed">
        <h1>Dethär är din dashboard.</h1>
        <h2> Hej {currentUser.name}.</h2>
        <form action="">
            <input type="text" name="title" bind:value={post_title} placeholder="Title">
            <input type="text" name="content" bind:value={post_description} placeholder="Content">
            <input type="file" name="file" bind:files={file}   >
            <Button onClick={() => upload()} text="Create Post"  />
        </form>
        <Button onClick={onLogout} text="Logout"/>
    </div>
</div>

<style>
.feedContainer{
    display: grid;
    grid-template-columns: repeat(12,1fr);  

}
.feed{
    grid-column: 3/11;
    grid-row: 2;
}
</style>