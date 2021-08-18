<script>
  let username = '';
  let email = '';
  let password = '';
</script>

<h2>Register your account</h2>

<input type="text" placeholder="username" bind:value={username}><br>
<input type="email" placeholder="email" bind:value={email}><br>
<input type="password" placeholder="password" bind:value={password}><br>
<button>Create account</button><br>

{username}<br>
{email}<br>
{password}
<style>

</style>