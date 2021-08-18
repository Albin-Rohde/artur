<script>
import Button from "../../components/Button.svelte";

  let username = '';
  let email = '';
  let password = '';
</script>

<h2>Register your account</h2>

<input type="text" placeholder="username" bind:value={username}><br>
<input type="email" placeholder="email" bind:value={email}><br>
<input type="password" placeholder="password" bind:value={password}><br>
<Button text = 'Create Account'></Button>

{username}<br>
{email}<br>
{password}
<style>

</style>