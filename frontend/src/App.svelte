<script lang="ts">
  import type { IUser,IUserRequest } from './api-client';
  import { User } from './api-client';
  import Navbar from "./components/Navbar.svelte";
  import { signInWithGoogle,signOutWithGoogle } from './firebase';
  import Dashboard from './views/Dashboard/Dashboard.svelte';
  import Login from "./views/Login/Login.svelte";
  import Register from "./views/Register/Register.svelte";

  // console.log(process);

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
  // console.log(global)
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
      const res = await user.login(detail);
      if(res === 'user does not exist'){
        console.log('user does not exist')
      } else {
        setScreen('Dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onGoogleLogin = async() => {
    const u = await signInWithGoogle();
        console.log(user);
        if (u) {
         const idk = await user.googleLogin(u)
         console.log(typeof idk);
         if(typeof idk === "string") {
           setScreen("Login");
         } else {
           currentUser = idk;
           setScreen('Dashboard');
         }
        }
  }

  const logout = async (u: IUser): Promise<void> => {
    try {
      if(u.avatar && u.avatar.includes('googleusercontent')) {
       await signOutWithGoogle()
      } 
      await user.logout();
      currentUser = null;
      setScreen("Login");
    } catch (err) {
      console.log(err);
    }
  }

  console.log(screen)

</script>

<svelte:head>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<main>
  <Navbar />
  {#if screen === "Register"}
    <Register setScreen={setScreen} onRegister={register}/>
  {:else if screen === "Login"}
    <Login  setScreen={setScreen} onLogin={login} onGoogleLogin={onGoogleLogin} />
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
