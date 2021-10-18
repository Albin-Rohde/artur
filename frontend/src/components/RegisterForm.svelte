<script>
 let username = "";
 let email = "";
 let password = "";
 let passwordConfirm = "";




function doWhenClicked(){
    let userdata = [username, email, password, passwordConfirm]
    console.log(userdata);
 }
</script>

<form>
    <label> Username </label>
    <input type="text" id="myText" bind:value={username} placeholder="Username"><br>

    <label> Email Address </label>
    <input type="text" id="myText" bind:value={email} placeholder="Email"><br>

    <label> Password </label>
    <input type="text" id="myText" bind:value={password} placeholder="Password"><br>

    <label> Confirm </label>
    <input type="text" id="myText" bind:value={passwordConfirm} placeholder="Confirm Password"><br>
    <button type="button" on:click={doWhenClicked} >Sign Up</button>
</form>


<style>

</style>
