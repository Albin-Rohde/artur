<script lang="ts">
  import type { IUser } from "../../api-client";

  export let currentUser: IUser;
  export let onLogout: (u: IUser) => Promise<void>;
</script>

<div class="profileContainer">
  <div class="profile" />
</div>

<style>
</style>
