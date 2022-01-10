<script lang="ts">
import type { IUserRequest } from "../../api-client";
import Button from "../../components/Button.svelte";
   export let setScreen;
   export let onLogin: (u: IUserRequest) => void;
  let email = "";
  let password = "";
</script>

<div class="site-container">
  <div class="login-container">
    <h2>Login to your account</h2>
    <br />

    <input
      class="input-style"
      type="text"
      placeholder="email"
      bind:value={email}
    /><br />
    <input
      class="input-style"
      type="password"
      placeholder="password"
      bind:value={password}
    /><br />
    <Button text="Log In" onClick={() => onLogin({
      email,
      password
    })} ></Button>
    <br>
    <div>Don't have an account? <div class="link" on:click={()=> setScreen('Register')}>Register</div> </div>
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
  .login-container {
    grid-column: 5/9;
    grid-row: 6/10;
  }

  .input-style {
    width: 100%;
  }
  .link{
    cursor: pointer;
  }
</style>
