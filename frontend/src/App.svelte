<script lang="ts">
  import Navbar from "./components/Navbar.svelte";

  import Register from "./views/Register/Register.svelte";
  import Login from "./views/Login/Login.svelte";
</script>

<main>
  <Navbar />
  <!-- <Login /> -->
  <Register />
</main>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }
</style>
