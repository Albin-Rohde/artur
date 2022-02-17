<script lang="ts">
  import type { IUserRequest } from "../../api-client";
  import Button from "../../components/Button.svelte";
  import GithubButton from "../../components/GithubButton.svelte";
  import GoogleButton from "../../components/GoogleButton.svelte";
  export let setScreen: any;
  export let onLogin: (u: IUserRequest) => Promise<void>;
  export let onGoogleLogin: () => Promise<void>;
  export let onGithubLogin: () => Promise<void>;
    let email = "";
    let password = "";
    
  



// const signOutWithGoogle = async () => {
//   return await signOut(auth);
// };



    // const handleGoogleLogin = async () => {
    //     const u = await signInWithGoogle();
    //     console.log(user);
    //     if (u) {
    //      const idk = await user.googleLogin(u)
    //      console.log(idk);
    //      if(typeof idk === "string") {
    //        setScreen("login");
    //      } else {
    //        setScreen("Dashboard");
    //      }
    //     }
        // if (user) {
        //     onLogin({
        //         email: user.email,
        //         name: user.displayName,
        //         photoUrl: user.photoURL,
        //         uid: user.uid
        //     });
        // }
    // };

</script>

<div class="site-container">
  <div class="login-container">
    <GoogleButton onClick={() => onGoogleLogin()} />
    <GithubButton onClick={() => onGithubLogin()}  />
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
