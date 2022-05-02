<script lang="ts">
  import type { IUser } from "../api-client/types";

  export let user: IUser;
</script>

<div class="box">
  {user.id}
</div>

<style>
  .box {
    border: 1px solid;
  }
</style>
