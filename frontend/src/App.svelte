<script lang="ts">
  import type { IUser,IUserRequest } from './api-client';
  import { User } from './api-client';
  import Navbar from "./components/Navbar.svelte";
  import Dashboard from './views/Dashboard/Dashboard.svelte';
  import Login from "./views/Login/Login.svelte";
  import Register from "./views/Register/Register.svelte";

  console.log(process);

  type ScreenType = 'Register' | 'Login' | 'Dashboard'
  
  let screen ="Register";
  
  const user = new User();
  
  let currentUser: IUser = null;

  const getSession = async () => {
    try {
      currentUser = await user.getSession()
      if (currentUser) {
        setScreen('Dashboard');
      }
    } catch (err) {
      // do some erorr display,
      currentUser = null;
    }
  }

  window.onload = () => getSession();
  const setScreen = (scream: ScreenType) => {
    screen = scream
  } 


  const register = async (detail: IUserRequest) => {
    try {
      console.log('register with data: ', detail)
      currentUser = await user.register(detail);
      console.log('currentUser: ', currentUser)
      console.log("Dashboard");
      
      setScreen('Dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  const login = async (detail: IUserRequest): Promise<void> => {
    try {
      currentUser = await user.login(detail);
      setScreen('Dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await user.logout();
      currentUser = null;
      setScreen("Login");
    } catch (err) {
      console.log(err);
    }
  }

  console.log(screen)

</script>

<main>
  <Navbar />
  {#if screen === "Register"}
    <Register setScreen={setScreen} onRegister={register}/>
  {:else if screen === "Login"}
    <Login  setScreen={setScreen} onLogin={login}/>
  {:else if screen === "Dashboard" && currentUser}
    <Dashboard currentUser={currentUser} onLogout={logout}/>
  {/if}

</main>

<style>
  * {
    margin: 0px;
    padding: 0px;
    z-index: -1;
  }
</style>
