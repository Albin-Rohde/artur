<script lang="ts">
  export let text = "";
  export let disable: boolean | undefined = false;
  export let onClick: (...a: any) => any;
</script>

{#if disable}
  <button class="dis" disabled>{text}</button>
{:else}
  <button class="knapp" on:click|preventDefault={onClick}>{text}</button>
{/if}

<style>
  .knapp {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #add5a9;
    width: 200px;
    height: 30px;
  }
  .knapp:hover {
    background: #96cb92;
  }
  .knapp:focus {
    background: #d6a7b4;
  }

  .dis {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #55595e;
    width: 200px;
    height: 30px;
  }
</style>
