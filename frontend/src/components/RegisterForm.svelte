<script>
 let username = "";
 let email = "";
 let password = "";
 let passwordConfirm = "";




function doWhenClicked(){

let userdata = [username, email, password, passwordConfirm]
console.log(userdata)

 }
</script>

<label> Username </label>
<input type="text" id="myText" value={username} placeholder="Username"><br>

<label> Email Address </label>
<input type="text" id="myText" value={email} placeholder="Email"><br>

<label> Password </label>
<input type="text" id="myText" value={password} placeholder="Password"><br>

<label> Confirm </label>
<input type="text" id="myText" value={passwordConfirm} placeholder="Confirm Password"><br>

<button onclick={doWhenClicked()}>Sign Up</button>

<style>

</style>
