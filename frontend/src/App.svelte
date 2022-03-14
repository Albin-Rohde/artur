<script lang="ts">
  import type { IUser, IUserRequest } from "./api-client";
  import { User } from "./api-client";
  import Navbar from "./components/Navbar.svelte";
  import { signInWithGoogle, signOut, signUpWithGithub } from "./firebase";
  import Dashboard from "./views/Dashboard/Dashboard.svelte";
  import Login from "./views/Login/Login.svelte";
  import Register from "./views/Register/Register.svelte";

  // console.log(process);

  type ScreenType = "Register" | "Login" | "Dashboard";

  let screen = "Register";

  const user = new User();

  let currentUser: IUser = null;

  const getSession = async () => {
    try {
      currentUser = await user.getSession();
      if (currentUser) {
        setScreen("Dashboard");
      }
    } catch (err) {
      // do some erorr display,
      currentUser = null;
    }
  };

  window.onload = () => getSession();
  // console.log(global)
  const setScreen = (scream: ScreenType) => {
    screen = scream;
  };

  const register = async (detail: IUserRequest) => {
    try {
      console.log("register with data: ", detail);
      currentUser = await user.register(detail);
      console.log("currentUser: ", currentUser);
      console.log("Dashboard");

      setScreen("Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (detail: IUserRequest): Promise<void> => {
    try {
      const res = await user.login(detail);
      console.log(res);
      setScreen("Dashboard");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleLogin = async () => {
    const u = await signInWithGoogle();
    console.log(u);
    if (u) {
      const socialUser = await user.socialLogin({
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        provider: "google",
      });
      if (typeof socialUser === "string") {
        setScreen("Login");
      } else {
        currentUser = socialUser;
        setScreen("Dashboard");
      }
    }
  };

  const onGithubLogin = async () => {
    const u = await signUpWithGithub();
    console.log(u);
    if (u) {
      const socialUser = await user.socialLogin({
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        provider: "github",
      });
      if (typeof socialUser === "string") {
        setScreen("Login");
      } else {
        currentUser = socialUser;
        setScreen("Dashboard");
      }
    }
  };

  const logout = async (u: IUser): Promise<void> => {
    try {
      if (u.avatar) {
        if (
          u.avatar.includes("googleusercontent") ||
          u.avatar.includes("githubusercontent")
        ) {
          await signOut();
        }
      }
      await user.logout();
      currentUser = null;
      setScreen("Login");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(screen);
</script>

<main>
  <Navbar />
  {#if screen === "Register"}
    <Register {setScreen} onRegister={register} />
  {:else if screen === "Login"}
    <Login {setScreen} onLogin={login} {onGoogleLogin} {onGithubLogin} />
  {:else if screen === "Dashboard" && currentUser}
    <Dashboard {currentUser} onLogout={(user) => logout(user)} />
  {/if}
</main>

<style>
  * {
    margin: 0px;
    padding: 0px;
    z-index: -1;
  }
</style>
