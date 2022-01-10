<script lang="ts">
    import type { IUser } from "../../api-client";
    import { Post } from '../../api-client';
    import Button from "../../components/Button.svelte";


export let currentUser: IUser;
export let onLogout: () => Promise<void>

const post = new Post();


(async ()=> {
    console.log("hello")
    const posts = await post.getFeed('color')
    console.log(posts)

})()

window.onload = async () => {
}

</script>

<div class="feedContainer">
    <div class="feed">
        <h1>Dethär är din dashboard.</h1>
        <h2> Hej {currentUser.name}.</h2>
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