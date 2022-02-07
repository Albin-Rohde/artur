<script lang="ts">
    import type { IUser } from "../../api-client";
    import { Post } from '../../api-client';
    import PlusButton from "../../components/PlusButton.svelte";
    import Button from "../../components/Button.svelte";
    import PostCreate from "../../components/PostCreate.svelte";
    export let currentUser: IUser;
    export let onLogout: () => Promise<void>
    console.log(currentUser);
    const scrollY = document.body.style.top;
    let postCreation = ""
    let post_description: string;
    let post_title: string;
    let file: FileList;
    const showPostCreate = ()=>{
        postCreation =  "Visible"
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    }
    const hidePostCreate = ()=>{
        postCreation =  ""
        document.body.style.position = '';
        document.body.style.top = '';
    }
// (async ()=> {
//     console.log("hello")
//     const posts = await post.getFeed('color')
//     console.log(posts)

// })()

window.onload = async () => {
}


</script>

<h1>Dethär är din dashboard.</h1>
<h2> Hej {currentUser.name}.</h2>

<Button onClick={onLogout} text="Logout"/>

{#if postCreation === "Visible"}
    <PostCreate onClick={()=>hidePostCreate()} currentUser = {currentUser}/>
{:else}
    <PlusButton onClick={()=> showPostCreate()}/>
{/if}
    
   
<div class="feedContainer">
    <div class="feed">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1%;
    /* grid-auto-rows: minmax(50px, auto); */

}
.feed div{
    width: 100%;
    height: 200px;
    background-color: #d6a7bd;    
}

</style>