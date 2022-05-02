<script lang="ts">
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Styles,
  } from "sveltestrap";
  import { User } from "../api-client";
  import type { IUser } from "../api-client/types";

  const u = new User();
  export let setScreen: (_: string) => void;

  export let user: IUser;

  (() => {
    console.log("u", user);
  })();
</script>

<Styles />
<div class="navbar">
  <div class="avatar-container">
    {#if user.avatar && user.avatar.length > 0 && user.avatar !== null}
      <img src={user.avatar} class="last" />
    {:else}
      <img src="assets/avatar.png" alt="*_*" class="avatar" />
    {/if}
  </div>
  <div class="logo-container">
    <img src="assets/text.png" alt="*_*" class="logo" />
  </div>
  <Dropdown>
    <DropdownToggle>
      <!-- <div class="burgir-container"> -->
      <img src="assets/hamburger.png" alt="*_*" class="hamburger" />
      <!-- </div> -->
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem
        on:click={() => {
          setScreen("Dashboard");
        }}>Dashboard</DropdownItem
      >
      <DropdownItem divider />
      <DropdownItem
        on:click={() => {
          setScreen("AddUser");
        }}>Add follower</DropdownItem
      >
      <DropdownItem divider />
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        on:click={async () => {
          await u.logout();
          setScreen("Login");
        }}>Logout</DropdownItem
      >
    </DropdownMenu>
  </Dropdown>
</div>
<div class="line" />

<style>
  img {
    margin: 0px;
    padding: 0px;
  }
  .navbar {
    display: grid;
    align-items: center;
    background-color: #96cb92;
    grid-template-columns: 15% 70% 15%;
    height: 16vh;
  }

  .last {
    margin-left: 10px;
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
  }
  .logo-container {
    grid-column: 2;
    height: 16vh;
    width: 40%;
    justify-self: center;
    display: flex;
    align-items: center;
  }
  .avatar-container {
    grid-column: 1;
    height: 16vh;
    width: 100%;
    justify-self: center;
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-left: 37%;
    height: 8vh;
    width: 6vh;
  }
  .logo {
    height: 85%;
    width: 100%;
  }
  /* .burgir-container {
    grid-column: 3;
    height: 16vh;
    width: 100%;
    justify-self: center;
    display: flex;
    align-items: center;
  } */
  .hamburger {
    margin-left: 33%;
    height: 10vh;
    width: 10vh;
  }

  .line {
    height: 0.3vh;
    background-color: #a2c6c5;
  }
</style>
