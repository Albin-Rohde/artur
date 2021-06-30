<script>
  export let doWhenClicked;
  export let text;
</script>

<button on:click={doWhenClicked}>{text}</button>

<style>
  button {
      background-color: red;
  }
</style>
