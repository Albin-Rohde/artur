<script lang="ts">
  export let text = "";
  export let onClick: (...a: any) => any;
</script>

<button class="knapp" on:click|preventDefault={onClick}>{text} </button>

<style>
  .knapp {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #add5a9;
    width: 8vw;
    height: 3vh;
  }
  .knapp:hover {
    background: #96cb92;
  }
  .knapp:focus {
    background: #d6a7b4;
  }
</style>
