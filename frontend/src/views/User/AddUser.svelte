<script lang="ts">
  import { Table } from "sveltestrap";
  import { User } from "../../api-client";
  import type { IUser } from "../../api-client/types";
  import Button from "../../components/Button.svelte";

  export let currentUser: IUser;

  let query = "";
  let users: IUser[] = [];
  const user = new User();

  const onChange = () => {
    console.log(query);
    user.search(query).then((res) => {
      console.log(res);
      users = res;
    });
  };
  //   document.onload = () => {
  //     document.querySelector("#query").addEventListener("onkeypress", (e) => {
  //       console.log(e);
  //     });
  //   };

  const onClick = async (u: IUser) => {
    console.log(u);
    const res = await user.addFollower(u.id);
    console.log(res);
  };
</script>

<div class="container">
  <h1>add User</h1>
  <input
    id="query"
    type="text"
    bind:value={query}
    on:keypress={() => {
      onChange();
      //   if (e.key === "Enter") {
      //     console.log(query);
      //     query = "";
      //   }
    }}
    placeholder="Search for users"
  />

  <Table>
    <thead>
      <tr>
        <th>Avatar</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td>
            {#if user.avatar && user.avatar.length > 0}
              <img src={user.avatar} class="avatar" />
            {:else}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                class="avatar"
              />
            {/if}
          </td>
          <td>{user.name}</td>
          <td>
            {#if !currentUser.followers.includes(user.id)}
              <Button
                onClick={() => {
                  onClick(user);
                }}
                text="Add"
              />
            {:else}
              <Button
                text="Already following"
                disable={true}
                onClick={() => {
                  return;
                }}
              />
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </Table>

  <!-- <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Follow</th>
    </tr>
    {#each users as user}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>+</td>
      </tr>
    {/each}
  </table> -->
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
