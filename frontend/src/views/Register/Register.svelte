<script>
  import Button from "../../components/Button.svelte";

  let username = "";
  let email = "";
  let password = "";
</script>

<div class="site-container">
  <div class="register-container">
    <h2>Register your account</h2>

    <input
      class="input-style"
      type="text"
      placeholder="username"
      bind:value={username}
    /><br />
    <input
      class="input-style"
      type="email"
      placeholder="email"
      bind:value={email}
    /><br />
    <input
      class="input-style"
      type="password"
      placeholder="password"
      bind:value={password}
    /><br />
    <Button text="Create Account" />

    {username}<br />
    {email}<br />
    {password}
  </div>
</div>

<style>
  .site-container {
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: 50px;
  }
  .register-container {
    grid-column: 5/9;
    grid-row: 6/10;
  }

  .input-style {
    width: 100%;
  }
</style>
