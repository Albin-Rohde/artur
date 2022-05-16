<script lang="ts">
  import type { IUserRequest } from "../../api-client";
  import Button from "../../components/Button.svelte";
  export let setScreen;
  export let onRegister: (u: IUserRequest) => void;

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
    <Button
      text="Create Account"
      onClick={() => onRegister({ name: username, email, password })}
    />
    <br />
    <p>
      <!-- svelte-ignore a11y-missing-attribute -->
      Already have an account?
      <a class="link" on:click={() => setScreen("Login")}>Log in</a>
    </p>
  </div>
</div>

<style>
  .site-container {
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-auto-rows: 50px;
    justify-content: center;
  }
  .register-container {
    grid-column: 10/18;
    grid-row: 6/10;
  }

  .input-style {
    width: 80%;
  }
  .link {
    cursor: pointer;
  }
</style>
