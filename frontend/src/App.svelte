<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import Register from "./views/Register/Register.svelte";
  import Login from "./views/Login/Login.svelte";

  let screen ="Register";

  console.log(screen)

  const setScreen = (scream: string) => {
    screen = scream
  } 

</script>

<main>
  <Navbar />
  {#if screen === "Register"}
  <Register setScreen={setScreen}/>
  {:else}
    {#if screen === "Login"}
      <Login  setScreen={setScreen}/>
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
