<script lang="ts">
  import type { IUserRequest } from './api-client';
  import { User } from './api-client';
  import Navbar from "./components/Navbar.svelte";
  import Login from "./views/Login/Login.svelte";
  import Register from "./views/Register/Register.svelte";

  type ScreenType = 'Register' | 'Login' | 'Dashboard'

  let screen ="Register";

  const user = new User();

  const register = async (detail: IUserRequest) => {
    try {
      await user.register(detail);
    } catch (error) {
      console.log(error);
    }
  }

  const login = async (detail: IUserRequest) => {
    try {
      console.log(await (await fetch('http://localhost:5000/')).json())
      await user.login(detail);
      console.log(user.user)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(screen)

  const setScreen = (scream: ScreenType) => {
    screen = scream
  } 

</script>

<main>
  <Navbar />
  {#if screen === "Register"}
  <Register setScreen={setScreen} onRegister={register}/>
  {:else}
    {#if screen === "Login"}
      <Login  setScreen={setScreen} onLogin={login}/>
    {:else}
  {/if}
  
  {/if}
  
</main>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }
</style>
