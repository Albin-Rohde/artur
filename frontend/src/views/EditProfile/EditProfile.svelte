<script lang="ts">

import { User } from '../../api-client';
import type {IUser} from '../../api-client'
import ProfileContainer from '../../components/ProfileContainer.svelte';
export let currentUser: IUser;


let profile_description: string;
let profile_name: string;
let file: FileList;
const user = new User

profile_name = currentUser.name
profile_description=currentUser.bio

const upload = async () => {
    console.log(profile_description, profile_name, file[0]);
    const p =  await user.avatar(
        // profile_description,
        // profile_name,
        // file: file[0]
    )
    console.log(p)
	window.location.replace("/");
}
</script>
<ProfileContainer currentUser={currentUser} />
<div class="formContainer">
<form class="form" action="">
    <input class="file" type="file" name="file" bind:files={file}>
    <textarea class="name" type="text" name="name" bind:value={profile_name} placeholder="Title"></textarea>
    <textarea class="description" type="text" name="content" bind:value={profile_description} placeholder="Content"></textarea>
    <button class='knapp' on:click|preventDefault={()=> upload()} >{"Save Changes"}</button>
</form>
</div>

<style>
    .formContainer{
        display: grid;
    grid-template-columns: repeat(12,1fr);  

    }

 .form{
     height: 100%;
    grid-column: 3/11;
    display: grid;
    grid-template-columns: repeat(12, 1fr);

 }
 .name{
    grid-row: 2/3;
		grid-column: 8/13;
		background-color: white;
		border-radius: 30px;	
		padding: 1rem;

 }

 .description{

    grid-row: 3/9;
		grid-column: 8/13;
		background-color: white;
		border-radius: 30px;	
		padding: 1rem;
 }
 textarea{
		resize: none;
	}

</style>