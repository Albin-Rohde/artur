<script lang="ts">
    import type { IUser } from "../api-client";

    export let currentUser: IUser;


</script>

<br>
<div class="profileContainer">
    <div class="profile">
        <div class="profilePicture">
            <div></div>
        </div>
        <div class="profileMain">
            <h2>{currentUser.name}</h2>

            <textarea readonly class="bio">{currentUser.bio}</textarea>
        </div>
    </div>
</div>


<style>
textarea{
    resize: none;  
}

.profileContainer{
    display: grid;
    grid-template-columns: repeat(12,1fr);  

}
.profile{
    height: 15vh;
    grid-column: 3/11;
    display: grid;
    grid-template-columns: repeat(12, 1fr);

}
.profilePicture{
    grid-column: 2/4;
}

.profilePicture > div{
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
    background-size: cover;
    background-image: url("https://preview.redd.it/1nox7mat7l781.jpg?auto=webp&s=89ccd4638a8c1452c0000bd884d18e0366ee1232");

}

.profileMain{
    grid-column: 5/13;
}
.bio{
    height: 10vh;
    width: 100%;
    border: none;
    outline: none;
    
}


</style>
