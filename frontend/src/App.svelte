<script lang="ts">
  import type { IUser, IUserRequest } from "./api-client";
  import { User } from "./api-client";
  import Navbar from "./components/Navbar.svelte";
  import { signInWithGoogle, signOut, signUpWithGithub } from "./firebase";
  import Dashboard from "./views/Dashboard/Dashboard.svelte";
  import Login from "./views/Login/Login.svelte";
  import Register from "./views/Register/Register.svelte";
  import Profile from "./views/Profile/Profile.svelte";
  import EditProfile from "./views/EditProfile/EditProfile.svelte";
  import AddUser from "./views/User/AddUser.svelte";

  // console.log(process);

  type ScreenType =
    | "Register"
    | "Login"
    | "Dashboard"
    | "Profile"
    | "EditProfile"
    | "AddUser";

  // console.log(process);
  let screen: ScreenType = "Register";

  const user = new User();

  let currentUser: IUser | null = null;

  window.onload = () => getSession();
  // console.log(global)
  const setScreen = (scream: ScreenType) => {
    screen = scream;
    localStorage.setItem("screen", scream);
  };
  const getSession = async () => {
    try {
      currentUser = await user.getSession();
      if (currentUser) {
        setScreen("Dashboard");
        console.log(currentUser);
        if (currentUser) {
          const s = localStorage.getItem("screen") || "Dashboard";
          setScreen(s as ScreenType);
        }
      }
    } catch (err) {
      // do some erorr display,
      currentUser = null;
    }
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
</script>

<main>
  {#if currentUser && (screen === "Dashboard" || screen === "EditProfile" || screen === "AddUser" || screen === "Profile")}
    <Navbar {setScreen} user={currentUser} />
  {/if}
  {#if screen === "Register"}
    <Register {setScreen} onRegister={register} />
  {:else if screen === "Login"}
    <Login {setScreen} onLogin={login} {onGoogleLogin} {onGithubLogin} />
  {:else if screen === "Dashboard" && currentUser}
    <Dashboard {currentUser} onLogout={logout} />
  {:else if screen === "Profile" && currentUser}
    <Profile {currentUser} onLogout={logout} />
  {:else if screen === "EditProfile" && currentUser}
    <EditProfile {currentUser} />
    <Dashboard {currentUser} onLogout={(user) => logout(user)} />
  {:else if screen === "AddUser" && currentUser}
    <AddUser {currentUser} />
  {/if}
</main>

<style>
  * {
    margin: 0px;
    padding: 0px;
    z-index: -1;
  }
</style>
